import { isDevMode } from '@angular/core'

import { ActionReducer, combineReducers } from '@ngrx/store'
import { compose } from '@ngrx/core/compose'
import { storeFreeze } from 'ngrx-store-freeze'
import { localStorageSync } from 'ngrx-store-localstorage'

import { createSelector } from 'reselect';

import * as BluetoothReducer from './bluetooth.reducer'
import * as FlexFuelReducer from './flexfuel.reducer'
import * as SetupReducer from './setup.reducer'
import * as ViewReducer from './view.reducer'

export interface State {
    bluetoothDevices: BluetoothReducer.State,
    flexFuelDevices: FlexFuelReducer.State,
    setup: SetupReducer.State,
    view: ViewReducer.State
}

const reducers = {
    bluetoothDevices: BluetoothReducer.reducer,
    flexFuelDevices: FlexFuelReducer.reducer,
    setup: SetupReducer.reducer,
    view: ViewReducer.reducer
}

const developmentReducer: ActionReducer<State> = compose(localStorageSync(
    ['bluetoothDevices', 'flexFuelDevices', 'setup', 'view'], true), storeFreeze, combineReducers)(reducers)
const productionReducer: ActionReducer<State> = compose(localStorageSync(
    ['bluetoothDevices', 'flexFuelDevices', 'setup', 'view'], true), combineReducers)(reducers)

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
export const getFlexFuelDevices = createSelector(getFlexFuelDevicesState, FlexFuelReducer.getDevices)
export const getFlexFuelDeviceConnected = createSelector(getFlexFuelDevicesState, FlexFuelReducer.getConnected)
export const getFlexFuelDeviceConnecting = createSelector(getFlexFuelDevicesState, FlexFuelReducer.getConnecting)
export const getFlexFuelDeviceStreaming = createSelector(getFlexFuelDevicesState, FlexFuelReducer.getStreaming)
export const getFlexFuelDeviceData = createSelector(getFlexFuelDevicesState, FlexFuelReducer.getData)
export const getFlexFuelDevice = createSelector(getFlexFuelDevicesState, FlexFuelReducer.getDevice)

export const getSetupState = (state: State) => state.setup
export const getSetupStateView = createSelector(getSetupState, SetupReducer.getView)