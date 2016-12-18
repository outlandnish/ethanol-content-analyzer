import * as setup from '../actions/setup.actions'
import * as flexfuel from '../actions/flexfuel.actions'

export interface State {
    view: string,
    active: boolean
}

const initialState: State = {
    view: setup.ActionTypes.SETUP_START,
    active: false
}

export function reducer(state = initialState, action: setup.Actions): State {
    switch (action.type) {
        case setup.ActionTypes.SETUP_ACTIVATE:
            console.log('activating setup')
            return Object.assign({}, state, { active: true })
        case setup.ActionTypes.SETUP_DEACTIVATE:
            console.log('deactivating setup')
            return Object.assign({}, state, { active: false })
        case setup.ActionTypes.SETUP_START:
        case setup.ActionTypes.SETUP_CONNECT:
        case setup.ActionTypes.SETUP_CONNECT_FAIL:
        case setup.ActionTypes.SETUP_CONNECT_SUCCESS:
        case setup.ActionTypes.SETUP_DETAILS_FAIL:
        case setup.ActionTypes.SETUP_DETAILS_SUCCESS:
            return Object.assign({}, state, { view: action.type })
        case flexfuel.ActionTypes.CONNECT_FLEXFUEL_SUCCESS:
            return Object.assign({}, state, { view: setup.ActionTypes.SETUP_CONNECT_SUCCESS })
        case flexfuel.ActionTypes.CONNECT_FLEXFUEL_ERROR:
            return Object.assign({}, state, { view: setup.ActionTypes.SETUP_CONNECT_FAIL })
        case flexfuel.ActionTypes.ADD_FLEXFUEL:
            return Object.assign({}, state, { view: setup.ActionTypes.SETUP_DETAILS_SUCCESS })
        case flexfuel.ActionTypes.DATA_FLEXFUEL_ERROR:
            return Object.assign({}, state, { view: setup.ActionTypes.SETUP_DETAILS_FAIL })
        default:
            return state
    }
}

export const getView = (state: State) => state.view
export const getActive = (state: State) => state.active