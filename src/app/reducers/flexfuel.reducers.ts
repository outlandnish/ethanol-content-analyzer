import { ActionReducer, Action } from '@ngrx/store'
import * as FlexFuelActions from '../actions/flexfuel.actions'

export function FlexFuelListReducer(state = [], action) {
    switch (action.type) {
        case FlexFuelActions.ActionTypes.ADD_FLEXFUEL:
            return [...state, Object.assign({}, action.payload.device)]
        case FlexFuelActions.ActionTypes.SETUP_FLEXFUEL:
            return state.map(device => {
                return device.id === action.payload.device.id ? Object.assign({}, device, action.payload.device) : device;
            })
        case FlexFuelActions.ActionTypes.DELETE_FLEXFUEL:
            return state.filter(device => device.id !== action.payload.device.id)
        default:
            return state
    }
}