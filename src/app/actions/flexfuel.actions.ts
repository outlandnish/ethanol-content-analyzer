import { Action } from '@ngrx/store'

import { FlexFuelDevice } from '../models/devices'

export const ActionTypes = {
    LOAD_FLEXFUEL:              '[Flex Fuel Device] Load',
    LOAD_FLEXFUEL_SUCCESS:      '[Flex Fuel Device] Load Success',
    LOAD_FLEXFUEL_FAIL:         '[Flex Fuel Device] Load Fail',
    ADD_FLEXFUEL:               '[Flex Fuel Device] Add',
    DELETE_FLEXFUEL:            '[Flex Fuel Device] Delete',
    SETUP_FLEXFUEL:             '[Flex Fuel Device] Setup',
    CONNECT_FLEXFUEL:           '[Flex Fuel Device] Connect',
    CONNECT_FLEXFUEL_SUCCESS:   '[Flex Fuel Device] Connect Success',
    CONNECT_FLEXFUEL_ERROR:     '[Flex Fuel Device] Connect Error',
    DISCONNECT_FLEXFUEL:        '[Flex Fuel Device] Disconnect',
    DATA_FLEXFUEL_UPDATE:       '[Flex Fuel Device] Data Update',
    DATA_FLEXFUEL_ERROR:        '[Flex Fuel Device] Data Error'
}

export class LoadFlexFuelDevicesAction implements Action {
    type = ActionTypes.LOAD_FLEXFUEL
    payload = null

    constructor() { }
}

export class LoadFlexFuelDevicesSuccessAction implements Action {
    type = ActionTypes.LOAD_FLEXFUEL_SUCCESS

    constructor(public payload: FlexFuelDevice[]) { }
}

export class LoadFlexFuelDevicesFailAction implements Action {
    type = ActionTypes.LOAD_FLEXFUEL_FAIL

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
    payload = null

    constructor() { }
}

export class ConnectFlexFuelDeviceFailAction implements Action {
    type = ActionTypes.CONNECT_FLEXFUEL_ERROR

    constructor(public payload: any) { }
}

export class DataFlexFuelErrorAction implements Action {
    type = ActionTypes.DATA_FLEXFUEL_ERROR

    constructor(public payload: any) { }
}

export type Actions
     = LoadFlexFuelDevicesAction
     | LoadFlexFuelDevicesSuccessAction
     | LoadFlexFuelDevicesFailAction
     | AddFlexFuelDeviceAction
     | DeleteFlexFuelDeviceAction
     | ConnectFlexFuelDeviceAction
     | ConnectFlexFuelDeviceSuccessAction
     | ConnectFlexFuelDeviceFailAction
     | DataFlexFuelErrorAction

/*export type Actions
     = LoadFlexFuelDevicesAction
     | LoadFlexFuelDevicesSuccessAction
     | LoadFlexFuelDevicesFailAction
     | AddFlexFuelDeviceAction
     | DeleteFlexFuelDeviceAction
     | SetupFlexFuelDeviceAction
     | ConnectFlexFuelDeviceAction
     | ConnectFlexFuelDeviceSuccessAction
     | ConnectFlexFuelDeviceFailAction
     | DataFlexFuelErrorAction*/