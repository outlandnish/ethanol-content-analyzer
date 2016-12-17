import { BluetoothDevice } from '../models/devices'
import * as bluetooth from '../actions/bluetooth.actions'
import * as flexfuel from '../actions/flexfuel.actions'

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
            return Object.assign({}, state, {
                loading: false,
                loaded: false
            })
        case bluetooth.ActionTypes.HIDE_PAIRED_BLUETOOTH_DEVICE:
            const device = action.payload

            return Object.assign({}, state, {
                devices: state.devices.filter(d => d.id !== device.id)
            })
        case flexfuel.ActionTypes.ADD_FLEXFUEL:
            const addDevice = action.payload

            return Object.assign({}, state, {
                devices: state.devices.filter(d => d.id !== addDevice.id)
            })
        case flexfuel.ActionTypes.DELETE_FLEXFUEL:
            const removeDevice = action.payload
            const btRemoveDevice = {
                id: removeDevice.id,
                class: removeDevice.class,
                address: removeDevice.address,
                name: removeDevice.name
            }

            return Object.assign({}, state, {
                devices: [...state.devices, btRemoveDevice]
            })
        default:
            return state
    }
}

export const getLoaded = (state: State) => state.loaded
export const getLoading = (state: State) => state.loading
export const getDevices = (state: State) => state.devices