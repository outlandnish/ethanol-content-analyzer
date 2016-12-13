import { Injectable } from '@angular/core'
import { Platform } from 'ionic-angular'
import { Observable, Subscription } from 'rxjs/rx'

import { BluetoothSerial } from 'ionic-native'
import { Storage } from '@ionic/storage'

import { FlexFuelDevice } from '../models/devices'

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
        private platform: Platform,
        private storage: Storage,
    ) { }

    async init() {
        await this.platform.ready()
        this.ready = true
        this.reading = false
    }

    async getFlexFuelDevices() {
        return await this.storage.get('devices')
    }

    async listPairedDevices() {
        if (!this.ready)
            await this.init()

        let devices = await BluetoothSerial.list()
        return devices.filter(d => d.name.indexOf('DT-') == 0)
    }

    async addDevice(device: FlexFuelDevice) {
        //this.devices.push(device)
        //await this.storage.set('devices', this.devices)
    }

    async removeDevice(device: FlexFuelDevice) {
        //this.devices = this.devices.filter(d => d.id != device.id)
        //await this.storage.set('devices', this.devices)
    }

    async connect(device: FlexFuelDevice) {
        this.connecting = true
        this.device = device
        if (!this.ready)
            await this.init()
        let connection = BluetoothSerial.connect(device.address)
        await connection
            .flatMap(c => this.setConnection(c))
            .toPromise()
    }

    setConnection(connection) {
        console.log('connected to flex fuel device')
        this.connection = connection
        return connection
    }

    async disconnect() {
        if (this.connection) {
            if (this.reading)
                await this.toggleRead()

            this.connection.unsubscribe()
            this.connecting = false
            this.connected = false
        }
    }

    async getFlexFuelInfo() {
        let vehicle = null, version = null
        if (!this.ready)
            await this.init()

        await this.toggleRead()
        var data = await BluetoothSerial.readUntil('\r\r')
        { vehicle, version } this.parseFlexFuelData(data)

        await this.toggleRead()

        return Object.assign({}, this.device, {
            vehicle, 
            version
        })
    }

    async toggleRead() {
        await BluetoothSerial.write("---+++---S\n")
        this.reading = !this.reading
    }

    async stream() {
        if (!this.connected)
            throw new Error()   // emit error because it's not connected

        // wait for platform to be ready
        if (!this.ready)
            await this.init()

        // start streaming Bluetooth if not already
        if (!this.reading)
            await this.toggleRead()

        return Observable.create(observer => {
            // subscribe to Bluetooth stream
            this.streamer = BluetoothSerial.subscribe('\r\r')
                .subscribe(
                data => {
                    let parsed = this.parseFlexFuelData(data)
                    observer.next(parsed)
                },
                error => {
                    // emit streaming error
                    console.error('data stream error', error)
                }
            )
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
        let ethanol = null, fuelPressure = null, vehicle = null, version = null
        if (data.indexOf("OUTPUT OFF") >= 0) {
            return { ethanol, fuelPressure, vehicle, version, output: false }
        }
        else {
            let split = data.replace(' ', '').split('\t')

            for (let part of split) {
                var field = part.split('=')
                if (field.indexOf('ETHANOL') >= 0)
                    ethanol = parseFloat(field[1]) / 5.0
                else if (field.indexOf('FuelT(C)') >= 0) {
                    fuelPressure = parseFloat(field[1]) / 5.0
                    fuelPressure = fuelPressure <= 1.5 ? 0 : fuelPressure
                }
                else if (field.indexOf('ID') >= 0)
                    { vehicle, version } this.parseFlexFuelDeviceInfo(field[1])
            }
            return { ethanol, fuelPressure, vehicle, version, output: true }
        }
    }

    parseFlexFuelDeviceInfo(id) {
        var split = id.split(' - ')
        let vehicle = split[0]
        let version = split[1].replace('Mk', 'Mark ')

        return { vehicle, version }
    }
}