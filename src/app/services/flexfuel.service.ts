import { Injectable } from '@angular/core'
import { Platform } from 'ionic-angular'
import { Subscription } from 'rxjs/rx'

import { BluetoothSerial } from 'ionic-native'

import { FlexFuelDevice } from '../models/devices'
import { FlexFuelData } from '../models/flexfuel-data'

@Injectable()
export class FlexFuelService {
    ready: boolean
    connecting: boolean
    connected: boolean
    connection: Subscription
    streamer: Subscription
    reading: boolean
    device: FlexFuelDevice

    constructor(
        private platform: Platform
    ) { }

    async init() {
        await this.platform.ready()
        this.ready = true
        this.reading = false
    }

    async listPairedDevices() {
        if (!this.ready)
            await this.init()

        let devices = await BluetoothSerial.list()
        return devices.filter(d => d.name.indexOf('DT-') == 0)
    }

    async connect(device: FlexFuelDevice) {
        if (!this.connected) {
            this.connecting = true
            this.device = device
            if (!this.ready)
                await this.init()

            let connection = BluetoothSerial.connect(device.address)
            await this.subscribe(connection)
        }
    }

    subscribe(connection) {
        return new Promise((resolve, reject) => {
            connection.subscribe(success => {
                this.connecting = false
                this.connected = true
                resolve(success)
            }, error => {
                this.connecting = false
                reject(error)
            })
        })
    }

    async disconnect() {
        console.log('disconnecting from device')
        try {
            if (this.connection) {
                if (this.reading)
                    await this.toggleRead()

                this.connection.unsubscribe()
                this.connecting = false
                this.connected = false
                return true
            }
        }
        catch(err) {
            throw err
        }
    }

    async getFlexFuelInfo() {
        if (!this.ready)
            await this.init()

        // request flex fuel kit to start sending data
        await this.toggleRead()

        // grab the details about the flex fuel kit
        let result = await this.getInfo() as FlexFuelData

        // request flex fuel kit to stop sending data
        await this.toggleRead()

        return Object.assign({}, this.device, {
            make: result.make,
            model: result.model,
            version: result.version,
            mark: result.mark
        })
    }

    async toggleRead() {
        await BluetoothSerial.write("---+++---S\n")
        this.reading = !this.reading
    }

    async getInfo() {
        return new Promise((resolve, reject) => {
            BluetoothSerial.subscribe('\r\r')
                .subscribe(data => {
                    let parsed: FlexFuelData = this.parseFlexFuelData(data)
                    if (parsed.make)
                        resolve(parsed)
                }, error => {
                    console.error('get info error', error)
                    reject(error)
                })
        })
    }

    async stream() {
        console.log('requested start streaming')
        if (!this.connected)
            throw new Error()   // emit error because it's not connected

        // wait for platform to be ready
        if (!this.ready)
            await this.init()

        // start streaming Bluetooth if not already
        if (!this.reading)
            await this.toggleRead()

        return new Promise((resolve, reject) => {
            console.log('susbcribing to bluetooth stream')
            this.streamer = BluetoothSerial.subscribe('\r\r')
                .subscribe(
                data => {
                    console.log('got data')
                    let parsed: FlexFuelData = this.parseFlexFuelData(data)
                    resolve(parsed)
                }, error => {
                    console.error('data stream error', error)
                    reject(error)
                })
        })
    }

    async stopStream() {
        if (this.connected) {
            // wait for platform to be ready
            if (!this.ready)
                await this.init()

            // stop subscription to Bluetooth stream
            this.streamer.unsubscribe()

            // start streaming Bluetooth if not already
            if (!this.reading)
                await this.toggleRead()
        }
    }

    parseFlexFuelData(data) {
        let ethanol = null, fuelPressure = null, make = null, model = null, version = null, mark = null
        try {
            let split = data.replace(':', '=').replace(';', '').split('\t')
            for (let part of split) {
                var field = part.replace(/\s/g, '').split('=')
                if (field[0].indexOf('ETHANOL') >= 0)
                    ethanol = parseFloat(field[1]) / 5.0
                else if (field[0].indexOf('FuelT(C)') >= 0) {
                    fuelPressure = parseFloat(field[1]) / 5.0
                    fuelPressure = fuelPressure <= 1.5 ? 0 : fuelPressure
                }
                else if (field[0].indexOf('ID') >= 0) {
                    let result = this.parseFlexFuelDeviceInfo(field[1])
                    make = result.make
                    model = result.model
                    version = result.version
                    mark = result.mark
                }
            }
        }
        catch (err) {
            console.log('error parsing data', data, err)
        }
        finally {
            return { ethanol, fuelPressure, make, model, version, mark, output: true }
        }
    }

    parseFlexFuelDeviceInfo(id) {
        if (id) {
            var split = id.split('-')
            let make = this.getMake(split[0])
            let model = this.getModel(split[1])
            let version = split[2]
            let mark = split[3].replace('Mk', 'Mark ')

            return { make, model, version, mark }
        }
        else
            return null
    }

    getMake(make) {
        switch (make) {
            case 'SUB':
                return 'Subaru'
            case 'MIT':
                return 'Mitsubishi'
            case 'MAZ':
                return 'Mazda'
            default:
                return make
        }
    }

    getModel(model) {
        switch (model) {
            case 'BRZ':
                return 'BRZ'
            case 'WRX':
                return 'WRX'
            case 'STI':
            case 'WRX/STI':
                return 'WRX STI'
            case 'FXT':
                return 'Forester'
            case 'EVOX':
                return 'Evolution X'
            case 'MX5':
                return 'Miata'
            default:
                return model
        }
    }
}