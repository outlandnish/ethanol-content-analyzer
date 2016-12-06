import { isDevMode } from '@angular/core'

import { ActionReducer, combineReducers } from '@ngrx/store'
import { compose } from '@ngrx/core/compose'
import { storeFreeze } from 'ngrx-store-freeze'

import { createSelector } from 'reselect';

import * as BluetoothReducer from './bluetooth.reducer'

export interface State {
    bluetoothDevices,
    flexFuelDevices,
    selectedDevice
}

const reducers = {
    bluetooth: BluetoothReducer.reducer
}

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers)
const productionReducer: ActionReducer<State> = combineReducers(reducers)

export function reducer(state: any, action: any) {
    if (isDevMode())
        return developmentReducer(state, action)
    else
        return productionReducer(state, action)
}

export const getBluetoothDevicesState = (state: State) => state.bluetoothDevices
export const getBluetoothDevicesLoaded = createSelector(getBluetoothDevicesState, BluetoothReducer.getLoaded)
export const getBluetoothDevicesLoading = createSelector(getBluetoothDevicesState, BluetoothReducer.getLoading)
export const getBluetoothDevices = createSelector(getBluetoothDevicesState, BluetoothReducer.getDevices)