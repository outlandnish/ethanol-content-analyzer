import { Action } from '@ngrx/store'

import { BluetoothDevice } from '../models/devices'

export const ActionTypes = {
    LOAD_PAIRED_BLUETOOTH_DEVICES:          '[Paired Bluetooth Device] Load',
    LOAD_PAIRED_BLUETOOTH_DEVICES_SUCCESS:  '[Paired Bluetooth Device] Success',
    LOAD_PAIRED_BLUETOOTH_DEVICES_FAIL:     '[Paired Bluetooth Device] Fail',
    HIDE_PAIRED_BLUETOOTH_DEVICE:           '[Paired Bluetooth Device] Hide'
}

export class LoadPairedBluetoothDevicesAction implements Action {
    type = ActionTypes.LOAD_PAIRED_BLUETOOTH_DEVICES

    constructor(public payload: any) { }
}

export class LoadPairedBluetoothDevicesSuccessAction implements Action {
    type = ActionTypes.LOAD_PAIRED_BLUETOOTH_DEVICES_SUCCESS

    constructor(public payload: BluetoothDevice[]) { }
}

export class LoadPairedBluetoothDevicesFailAction implements Action {
    type = ActionTypes.LOAD_PAIRED_BLUETOOTH_DEVICES_FAIL

    constructor(public payload: any) { }
}

export class HideBluetoothDeviceAction implements Action {
    type = ActionTypes.HIDE_PAIRED_BLUETOOTH_DEVICE

    constructor(public payload: BluetoothDevice) { }
}

export type Actions
     = LoadPairedBluetoothDevicesAction
     | LoadPairedBluetoothDevicesSuccessAction
     | LoadPairedBluetoothDevicesFailAction
     | HideBluetoothDeviceAction