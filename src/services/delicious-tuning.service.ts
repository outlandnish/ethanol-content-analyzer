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

    async connectDevice(device: StoredDevice) {
        try {
            this.device = device
            console.log(`trying to connect to ${device.address}`)
            this.connection = BluetoothSerial.connect(device.address)
            this.connection.subscribe(async result => {
                console.log(`connected to ${device.address}`)
                console.log('sending write request')
                await BluetoothSerial.write("---+++---S\n")
                console.log('sent. waiting for data...')
                var received = BluetoothSerial.subscribe('\r\r')
                received.subscribe(d => {
                    this.parseData(d)
                }, e => {
                    console.error(e)
                })
            })
        }
        catch (err) {
            console.error(`unable to connect to ${device.address}`)
            console.error(err)
        }
    }

    parseData(data) {
        let split = data.replace(' ', '').split('\t')
        for (let part of split) {
            if (part.contains('ETHANOL'))
                this.ethanol = parseFloat(part.split('=')[1]) / 5.0
            else if (part.contains('FuelT(C)'))
                this.fuelPressure = parseFloat(part.split('=')[1]) / 5.0
            else if (part.contains('ID'))
                this.device.nickname = part.split('=')[1]
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

    
}