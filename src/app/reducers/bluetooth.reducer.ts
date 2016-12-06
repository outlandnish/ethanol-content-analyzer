import { BluetoothDevice } from '../models/devices'
import * as bluetooth from '../actions/bluetooth.actions'

export interface State {
    loaded: boolean,
    loading: boolean,
    devices: BluetoothDevice[]
}

const initialState: State = {
    loaded: false,
    loading: false,
    devices: []
}

export function reducer(state = initialState, action: bluetooth.Actions): State {
    switch (action.type) {
        case bluetooth.ActionTypes.LOAD_PAIRED_BLUETOOTH_DEVICES:
            return Object.assign({}, state, {
                loading: true
            })
        case bluetooth.ActionTypes.LOAD_PAIRED_BLUETOOTH_DEVICES_SUCCESS:
            const devices = action.payload

            return {
                loaded: true,
                loading: false,
                devices: devices
            }
        case bluetooth.ActionTypes.LOAD_PAIRED_BLUETOOTH_DEVICES_FAIL:
            return state
        case bluetooth.ActionTypes.HIDE_PAIRED_BLUETOOTH_DEVICE:
            const device = action.payload

            return Object.assign({}, state, {
                devices: state.devices.filter(d => d.id !== device.id)
            })
    }
}

export const getLoaded = (state: State) => state.loaded
export const getLoading = (state: State) => state.loading
export const getDevices = (state: State) => state.devices