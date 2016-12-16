import * as setup from '../actions/setup.actions'
import * as flexfuel from '../actions/flexfuel.actions'

export interface State {
    view: string
}

const initialState: State = {
    view: setup.ActionTypes.SETUP_START,
}

export function reducer(state = initialState, action: setup.Actions): State {
    switch (action.type) {
        case setup.ActionTypes.SETUP_START:
        case setup.ActionTypes.SETUP_CONNECT:
        case setup.ActionTypes.SETUP_CONNECT_FAIL:
        case setup.ActionTypes.SETUP_CONNECT_SUCCESS:
        case setup.ActionTypes.SETUP_DETAILS_FAIL:
        case setup.ActionTypes.SETUP_DETAILS_SUCCESS:
            return { view: action.type }
        case flexfuel.ActionTypes.CONNECT_FLEXFUEL_SUCCESS:
            return { view: setup.ActionTypes.SETUP_CONNECT_SUCCESS }
        case flexfuel.ActionTypes.CONNECT_FLEXFUEL_ERROR:
            console.log('connection error', action.payload)
            return { view: setup.ActionTypes.SETUP_CONNECT_FAIL }
        case flexfuel.ActionTypes.ADD_FLEXFUEL:
            return { view: setup.ActionTypes.SETUP_DETAILS_SUCCESS }
        case flexfuel.ActionTypes.DATA_FLEXFUEL_ERROR:
            return { view: setup.ActionTypes.SETUP_DETAILS_FAIL }
        default:
            return state
    }
}

export const getView = (state: State) => state.view