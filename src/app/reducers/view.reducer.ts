import * as view from '../actions/view.actions'

export interface State {
    active: boolean
}

const initialState: State = {
    active: false
}

export function reducer(state = initialState, action: view.Actions): State {
    switch (action.type) {
        case view.ActionTypes.VIEW_ACTIVATE:
            console.log('activating view data')
            return Object.assign({}, state, { active: true })
        case view.ActionTypes.VIEW_DEACTIVATE:
            console.log('deactivating view data')
            return Object.assign({}, state, { active: false })
        default:
            return state
    }
}

export const getActive = (state: State) => state.active