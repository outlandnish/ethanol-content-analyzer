import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'

import { BluetoothDevice } from '../models/devices'

export const ActionTypes = {
    LOAD_PAIRED_BLUETOOTH_DEVICE: 'LOAD_PAIRED_BLUETOOTH_DEVICE_DEVICES',
    LOAD_PAIRED_BLUETOOTH_DEVICE_SUCCESS: 'LOAD_PAIRED_BLUETOOTH_DEVICE_DEVICES_SUCCESS',
    LOAD_PAIRED_BLUETOOTH_DEVICE_FAIL: 'LOAD_PAIRED_BLUETOOTH_DEVICE_DEVICES_FAIL',
    HIDE_PAIRED_BLUETOOTH_DEVICE: 'HIDE_PAIRED_BLUETOOTH_DEVICE'
}

export class LoadPairedBluetoothDevicesAction implements Action {
    type = ActionTypes.LOAD_PAIRED_BLUETOOTH_DEVICE

    constructor() { }
}

export class LoadPairedBluetoothDevicesSuccessAction implements Action {
    type = ActionTypes.LOAD_PAIRED_BLUETOOTH_DEVICE_SUCCESS

    constructor(public payload: BluetoothDevice[]) { }
}

export class LoadPairedBluetoothDevicesErrorAction implements Action {
    type = ActionTypes.LOAD_PAIRED_BLUETOOTH_DEVICE

    constructor(public payload: any) { }
}

export class HideBluetoothDeviceAction implements Action {
    type = ActionTypes.HIDE_PAIRED_BLUETOOTH_DEVICE

    constructor(public payload: BluetoothDevice) { }
}

export type Actions
     = LoadPairedBluetoothDevicesAction
     | LoadPairedBluetoothDevicesSuccessAction
     | LoadPairedBluetoothDevicesErrorAction
     | HideBluetoothDeviceAction