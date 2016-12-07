import { isDevMode } from '@angular/core'

import { ActionReducer, combineReducers } from '@ngrx/store'
import { compose } from '@ngrx/core/compose'
import { storeFreeze } from 'ngrx-store-freeze'

import { createSelector } from 'reselect';

import * as BluetoothReducer from './bluetooth.reducer'
import * as FlexFuelReducer from './flexfuel.reducer'

export interface State {
    bluetoothDevices: BluetoothReducer.State,
    flexFuelDevices: FlexFuelReducer.State
}

const reducers = {
    bluetoothDevices: BluetoothReducer.reducer,
    flexFuelDevices: FlexFuelReducer.reducer
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

export const getFlexFuelDevicesState = (state: State) => state.flexFuelDevices
export const getFlexFuelDevicesLoaded = createSelector(getFlexFuelDevicesState, FlexFuelReducer.getLoaded)
export const getFlexFuelDevicesLoading = createSelector(getFlexFuelDevicesState, FlexFuelReducer.getLoading)
export const getFlexFuelDevices = createSelector(getFlexFuelDevicesState, FlexFuelReducer.getDevices)
export const getFlexFuelDevicesConnected = createSelector(getFlexFuelDevicesState, FlexFuelReducer.getConnected)
export const getFlexFuelDevicesConnecting = createSelector(getFlexFuelDevicesState, FlexFuelReducer.getConnecting)
export const getFlexFuelDevice = createSelector(getFlexFuelDevicesState, FlexFuelReducer.getDevice)