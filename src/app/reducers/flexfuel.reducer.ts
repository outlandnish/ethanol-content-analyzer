import { FlexFuelDevice } from '../models/devices'
import { FlexFuelData } from '../models/flexfuel-data'
import * as flexfuel from '../actions/flexfuel.actions'

export interface State {
    devices: FlexFuelDevice[]
    connected: boolean,
    connecting: boolean,
    streaming: boolean,
    device: FlexFuelDevice,
    data: FlexFuelData,
    ethanol: number,
    hasEthanol: boolean,
    fuelPressure: number,
    hasFuelPressure: boolean,
    error: boolean
}

const initialState: State = {
    devices: [],
    connected: false,
    connecting: false,
    streaming: false,
    device: null,
    data: null,
    ethanol: 0,
    hasEthanol: false,
    fuelPressure: 0,
    hasFuelPressure: false,
    error: false
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
                connecting: true,
                error: false
            })
        case flexfuel.ActionTypes.CONNECT_FLEXFUEL_SUCCESS:
            return Object.assign({}, state, {
                connecting: false,
                connected: true,
                error: false,
            })
        case flexfuel.ActionTypes.CONNECT_FLEXFUEL_ERROR:
            console.log('flexfuel connection error')
            return Object.assign({}, state, {
                connecting: false,
                connected: false,
                streaming: false,
                error: true
            })
        case flexfuel.ActionTypes.DISCONNECT_FLEXFUEL:
            return Object.assign({}, state, {
                connecting: false,
                connected: false,
                streaming: false,
                error: false,
                device: null
            })
        case flexfuel.ActionTypes.DATA_FLEXFUEL_STREAM_START:
            return Object.assign({}, state, {
                streaming: true,
            })
        case flexfuel.ActionTypes.DATA_FLEXFUEL_STREAM_END:
            return Object.assign({}, state, {
                streaming: false
            })
        case flexfuel.ActionTypes.DATA_FLEXFUEL_UPDATE:
            const dataUpdate = action.payload as FlexFuelData
            return Object.assign({}, state, {
                data: dataUpdate,
                ethanol: dataUpdate.ethanol,
                fuelPressure: dataUpdate.fuelPressure,
                hasEthanol: dataUpdate.hasEthanol,
                hasFuelPressure: dataUpdate.hasFuelPressure
            })
        case flexfuel.ActionTypes.DATA_FLEXFUEL_ERROR:
            console.log('data error')
            return Object.assign({}, state, {
                error: true
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
export const getEthanol = (state: State) => state.ethanol
export const getFuelPressure = (state: State) => state.fuelPressure
export const getHasEthanol = (state: State) => state.hasEthanol
export const getHasFuelPressure = (state: State) => state.hasFuelPressure