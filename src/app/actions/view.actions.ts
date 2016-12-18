import { Action } from '@ngrx/store'

export const ActionTypes = {
    VIEW_ACTIVATE:           '[View] Activate',
    VIEW_DEACTIVATE:         '[View] Deactive',
}

export class ViewActivateAction implements Action {
    type = ActionTypes.VIEW_ACTIVATE
    payload = null

    constructor() { }
}

export class ViewDeactivateAction implements Action {
    type = ActionTypes.VIEW_DEACTIVATE
    payload = null

    constructor() { }
}

export type Actions
     = ViewActivateAction
     | ViewDeactivateAction