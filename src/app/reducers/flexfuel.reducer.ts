import { FlexFuelDevice } from '../models/devices'
import * as flexfuel from '../actions/flexfuel.actions'

export interface State {
    loaded: boolean,
    loading: boolean,
    devices: FlexFuelDevice[]
    connected: boolean,
    connecting: boolean,
    device: FlexFuelDevice
}

const initialState: State = {
    loaded: false,
    loading: false,
    devices: [],
    connected: false,
    connecting: false,
    device: null
}

export function reducer(state = initialState, action: flexfuel.Actions): State {
    switch (action.type) {
        case flexfuel.ActionTypes.ADD_FLEXFUEL:
            const newDevice = action.payload
             return Object.assign({}, state, {
                 devices: [ ...state.devices, newDevice ]
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
                connected: false
            })
        default:
            return state
    }
}

export const getLoaded = (state: State) => state.loaded
export const getLoading = (state: State) => state.loading
export const getDevices = (state: State) => state.devices

export const getConnected = (state: State) => state.connected
export const getConnecting = (state: State) => state.connecting
export const getDevice = (state: State) => state.device