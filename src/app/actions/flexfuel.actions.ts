import { Action } from '@ngrx/store'

import { FlexFuelDevice } from '../models/devices'
import { FlexFuelData } from '../models/flexfuel-data'

export const ActionTypes = {
    LOAD_FLEXFUEL:                  '[Flex Fuel Device] Load',
    LOAD_FLEXFUEL_SUCCESS:          '[Flex Fuel Device] Load Success',
    LOAD_FLEXFUEL_FAIL:             '[Flex Fuel Device] Load Fail',
    ADD_FLEXFUEL:                   '[Flex Fuel Device] Add',
    DELETE_FLEXFUEL:                '[Flex Fuel Device] Delete',
    SETUP_FLEXFUEL:                 '[Flex Fuel Device] Setup',
    CONNECT_FLEXFUEL:               '[Flex Fuel Device] Connect',
    CONNECT_FLEXFUEL_SUCCESS:       '[Flex Fuel Device] Connect Success',
    CONNECT_FLEXFUEL_ERROR:         '[Flex Fuel Device] Connect Error',
    DISCONNECT_FLEXFUEL:            '[Flex Fuel Device] Disconnect',
    DISCONNECT_FLEXFUEL_COMPLETE:   '[Flex Fuel Device] Disconnect Complete',
    DATA_FLEXFUEL_STREAM_START:     '[Flex Fuel Device] Data Stream Start',
    DATA_FLEXFUEL_STREAM_END:       '[Flex Fuel Device] Data Stream End',
    DATA_FLEXFUEL_UPDATE:           '[Flex Fuel Device] Data Update',
    DATA_FLEXFUEL_ERROR:            '[Flex Fuel Device] Data Error'
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

export class DisconnectFlexFuelDeviceAction implements Action {
    type = ActionTypes.DISCONNECT_FLEXFUEL
    payload = null

    constructor() { }
}

export class DisconnectFlexFuelDeviceCompletedAction implements Action {
    type = ActionTypes.DISCONNECT_FLEXFUEL_COMPLETE

    constructor(public payload: boolean) { }
}

export class DataFlexFuelErrorAction implements Action {
    type = ActionTypes.DATA_FLEXFUEL_ERROR

    constructor(public payload: any) { }
}

export class DataFlexFuelUpdateAction implements Action {
    type = ActionTypes.DATA_FLEXFUEL_ERROR

    constructor(public payload: FlexFuelData) { }
}

export class DataFlexFuelStreamStartAction implements Action {
    type = ActionTypes.DATA_FLEXFUEL_STREAM_START
    payload = null

    constructor() { }
}

export class DataFlexFuelStreamEndAction implements Action {
    type = ActionTypes.DATA_FLEXFUEL_STREAM_END
    payload = null

    constructor() { }
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
     | DisconnectFlexFuelDeviceAction
     | DisconnectFlexFuelDeviceCompletedAction
     | DataFlexFuelStreamStartAction
     | DataFlexFuelStreamEndAction
     | DataFlexFuelUpdateAction
     | DataFlexFuelErrorAction