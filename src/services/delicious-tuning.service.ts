import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/observable'
import { BluetoothSerial } from 'ionic-native'
import { Storage } from '@ionic/storage'
import * as _ from 'lodash'

import { BluetoothDevice, StoredDevice } from '../models/devices'

@Injectable()
export class DeliciousTuningService {
    setupDevices: StoredDevice[] = []
    pairedDevices: BluetoothDevice[] = []
    device: StoredDevice
    storage: Storage
    connection: Observable<any>
    connected: boolean
    ethanol: number
    fuelPressure: number

    constructor(storage: Storage) {
        this.loadSetupDevices()
        this.storage = storage
    }

    async loadSetupDevices() {
        var devices = await this.storage.get('devices')
        if (devices != null)
            this.setupDevices = devices
    }

    async saveSetupDevices() {
        await this.storage.set('devices', this.setupDevices)
    }

    async addDevice(device: StoredDevice) {
        this.setupDevices.push(device)
        await this.saveSetupDevices()
        await this.getDevices()
    }

    async removeDevice(device: StoredDevice) {
        this.setupDevices = this.setupDevices.filter(d => d.id != device.id)
        await this.saveSetupDevices()
        await this.getDevices()
    }

    async connect(device: StoredDevice) {
        try {
            this.device = device
            console.log(`trying to connect to ${device.address}`)
            this.connection = BluetoothSerial.connect(device.address)
            this.connection.subscribe(async result => {
                console.log(`connected to ${device.address}`)
                this.connected = true
                // emit connected
            })
        }
        catch (err) {
            console.error(`unable to connect to ${device.address}`)
            console.error(err)
        }
    }

    async streamData() {
        await this.toggleRead()
        var subscription = BluetoothSerial.subscribe('\r\r')
        subscription.subscribe(d => {
            var parsed = this.parseData(d)
            if (parsed.output) {
                this.ethanol = parsed.ethanol
                this.fuelPressure = parsed.fuelPressure
            }
            // emit this data
        }, e => {
            console.error(e)
        })
    }

    async getDeviceInfo() {
        await this.toggleRead()
        var data = await BluetoothSerial.readUntil('\r\r')
        var result = this.parseData(data)
        await this.toggleRead()
        return result.info
    }

    async disconnect() {
        await this.toggleRead()
        //if (this.connection)
        // disconnect from device here
        this.connected = false
    }

    async toggleRead() {
        await BluetoothSerial.write("---+++---S\n")
    }

    parseData(data) {
        let ethanol = null, fuelPressure = null, info = null
        if (data.indexOf("OUTPUT OFF") >= 0) {
            return { ethanol, fuelPressure, info, output: false }
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
                    info = this.parseDeviceInfo(field[1])
            }
            return { ethanol, fuelPressure, info, output: true }
        }
    }

    async getDevices() {
        console.log('getting devices')
        let devices = await BluetoothSerial.list()
        let lookup = _.keyBy(this.setupDevices, d => d.id)
        this.pairedDevices = devices.filter(d => d.name.indexOf('DT-') == 0 && lookup[d.id] === undefined)
        console.log('devices', this.pairedDevices)
        return this.pairedDevices
    }

    async discoverDevices() {
        let enabled = await BluetoothSerial.isEnabled()
        if (!enabled)
            await BluetoothSerial.enable()
        let unpairedListener = BluetoothSerial.setDeviceDiscoveredListener()
        let unpaired = await BluetoothSerial.discoverUnpaired()
        return { unpaired, unpairedListener }
    }

    parseDeviceInfo(id) {
        var split = id.split(' - ')
        let vehicle = split[0]
        let version = split[1].replace('Mk', 'Mark ')
        return { vehicle, version }
    }
}