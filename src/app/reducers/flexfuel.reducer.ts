import { FlexFuelDevice } from '../models/devices'
import { FlexFuelData } from '../models/flexfuel-data'
import * as flexfuel from '../actions/flexfuel.actions'

export interface State {
    devices: FlexFuelDevice[]
    connected: boolean,
    connecting: boolean,
    streaming: boolean,
    device: FlexFuelDevice,
    data: FlexFuelData
}

const initialState: State = {
    devices: [],
    connected: false,
    connecting: false,
    streaming: false,
    device: null,
    data: null
}

export function reducer(state = initialState, action: flexfuel.Actions): State {
    switch (action.type) {
        case flexfuel.ActionTypes.ADD_FLEXFUEL:
            const newDevice = action.payload
             return Object.assign({}, state, {
                 devices: [ ...state.devices, newDevice ],
                 // this has the potential to be problematic
                 device: newDevice
             })
        case flexfuel.ActionTypes.DELETE_FLEXFUEL:
            const removeDevice = action.payload
            Object.assign({}, state, {
                 devices: state.devices.filter(d => d.id !== removeDevice.id),
                 device: state.device.id === removeDevice.id ? null : state.device
             })
        case flexfuel.ActionTypes.CONNECT_FLEXFUEL:
            const connectDevice = action.payload
            return Object.assign({}, state, {
                device: connectDevice,
                connecting: true
            })
        case flexfuel.ActionTypes.CONNECT_FLEXFUEL_SUCCESS:
            return Object.assign({}, state, {
                connecting: false,
                connected: true
            })
        case flexfuel.ActionTypes.CONNECT_FLEXFUEL_ERROR:
            return Object.assign({}, state, {
                connecting: false,
                connected: false,
                streaming: false
            })
        case flexfuel.ActionTypes.DISCONNECT_FLEXFUEL:
            return Object.assign({}, state, {
                connecting: false,
                connected: false,
                streaming: false,
                device: null
            })
        case flexfuel.ActionTypes.DATA_FLEXFUEL_STREAM_START:
            return Object.assign({}, state, {
                streaming: true
            })
        case flexfuel.ActionTypes.DATA_FLEXFUEL_STREAM_END:
            return Object.assign({}, state, {
                streaming: false
            })
        case flexfuel.ActionTypes.DATA_FLEXFUEL_UPDATE:
            console.log('data update', action.payload)
            const dataUpdate = action.payload as FlexFuelData
            return Object.assign({}, state, {
                data: dataUpdate
            })
        default:
            return state
    }
}

export const getDevices = (state: State) => state.devices

export const getConnected = (state: State) => state.connected
export const getConnecting = (state: State) => state.connecting
export const getStreaming = (state: State) => state.streaming
export const getData = (state: State) => state.data
export const getDevice = (state: State) => state.device