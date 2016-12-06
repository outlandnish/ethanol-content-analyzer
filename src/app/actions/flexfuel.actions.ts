import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'

import { FlexFuelDevice } from '../models/devices'
import { FlexFuelData } from '../models/flexfuel-data'

export const ActionTypes = {
    LOAD_FLEXFUEL: 'LOAD_FLEXFUEL_DEVICES',
    LOAD_FLEXFUEL_SUCCESS: 'LOAD_FLEXFUEL_DEVICES_SUCCESS',
    LOAD_FLEXFUEL_FAIL: 'LOAD_FLEXFUEL_DEVICES_FAIL',
    ADD_FLEXFUEL: 'ADD_FLEXFUEL_DEVICE',
    DELETE_FLEXFUEL: 'DELETE_FLEXFUEL_DEVICE',
    SETUP_FLEXFUEL: 'SETUP_FLEXFUEL_DEVICE',
    CONNECT_FLEXFUEL: 'CONNECT_FLEXFUEL_DEVICE',
    CONNECT_FLEXFUEL_CONNECTING: 'CONNECT_FLEXFUEL_CONNECTING',
    CONNECT_FLEXFUEL_SUCCESS: 'CONNECT_FLEXFUEL_DEVICE_SUCCESS',
    CONNECT_FLEXFUEL_ERROR: 'CONNECT_FLEXFUEL_DEVICE_ERROR',
    DISCONNECT_FLEXFUEL: 'DISCONNECT_FLEXFUEL_DEVICE',
    DATA_FLEXFUEL_UPDATE: 'DATA_UPDATE_FLEXFUEL_DEVICE',
    DATA_FLEXFUEL_ERROR: 'DATA_ERROR_FLEXFUEL_DEVICE'
}

export class LoadFlexFuelDevicesAction implements Action {
    type = ActionTypes.LOAD_FLEXFUEL

    constructor() { }
}

export class LoadFlexFuelDevicesSuccessAction implements Action {
    type = ActionTypes.LOAD_FLEXFUEL_SUCCESS

    constructor(public payload: FlexFuelDevice[]) { }
}

export class LoadFlexFuelDevicesErrorAction implements Action {
    type = ActionTypes.LOAD_FLEXFUEL

    constructor(public payload: any) { }
}

export class AddFlexFuelDeviceAction implements Action {
    type = ActionTypes.ADD_FLEXFUEL

    constructor(public payload: FlexFuelDevice) { }
}

export class DeleteFlexFuelDeviceAction implements Action {
    type = ActionTypes.DELETE_FLEXFUEL

    constructor(public payload: FlexFuelDevice) { }
}

export class SetupFlexFuelDeviceAction implements Action {
    type = ActionTypes.SETUP_FLEXFUEL

    constructor(public payload: FlexFuelDevice) { }
}

export class ConnectFlexFuelDeviceAction implements Action {
    type = ActionTypes.CONNECT_FLEXFUEL

    constructor(public payload: FlexFuelDevice) { }
}

export class ConnectFlexFuelDeviceSuccessAction implements Action {
    type = ActionTypes.CONNECT_FLEXFUEL_SUCCESS

    constructor(public payload: FlexFuelDevice) { }
}

export class ConnectFlexFuelDeviceErrorAction implements Action {
    type = ActionTypes.CONNECT_FLEXFUEL_ERROR

    constructor(public payload: any) { }
}

export type Actions
     = LoadFlexFuelDevicesAction
     | LoadFlexFuelDevicesSuccessAction
     | LoadFlexFuelDevicesErrorAction
     | AddFlexFuelDeviceAction
     | DeleteFlexFuelDeviceAction
     | SetupFlexFuelDeviceAction
     | ConnectFlexFuelDeviceAction
     | ConnectFlexFuelDeviceSuccessAction
     | ConnectFlexFuelDeviceErrorAction