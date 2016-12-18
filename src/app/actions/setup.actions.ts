import { Action } from '@ngrx/store'

export const ActionTypes = {
    SETUP_ACTIVATE:         '[Setup] Activate',
    SETUP_DEACTIVATE:       '[Setup] Deactive',
    SETUP_START:            '[Setup] Start',
    SETUP_CONNECT:          '[Setup] Connect',
    SETUP_CONNECT_SUCCESS:  '[Setup] Connect Success',
    SETUP_CONNECT_FAIL:     '[Setup] Connect Fail',
    SETUP_DETAILS_SUCCESS:  '[Setup] Details Success',
    SETUP_DETAILS_FAIL:     '[Setup] Details Fail'
}

export class SetupStartAction implements Action {
    type = ActionTypes.SETUP_START
    payload = null

    constructor() { }
}

export class SetupConnectAction implements Action {
    type = ActionTypes.SETUP_CONNECT
    payload = null

    constructor() { }
}

export class SetupConnectSuccessAction implements Action {
    type = ActionTypes.SETUP_CONNECT_SUCCESS
    payload = null

    constructor() { }
}

export class SetupConnectFailAction implements Action {
    type = ActionTypes.SETUP_CONNECT_FAIL

    constructor(public payload: any) { }
}

export class SetupDetailsSuccessAction implements Action {
    type = ActionTypes.SETUP_DETAILS_SUCCESS
    payload = null

    constructor() { }
}

export class SetupDetailsFailAction implements Action {
    type = ActionTypes.SETUP_DETAILS_FAIL

    constructor(public payload: any) { }
}

export class SetupActivateAction implements Action {
    type = ActionTypes.SETUP_ACTIVATE
    payload = null

    constructor() { }
}

export class SetupDeactivateAction implements Action {
    type = ActionTypes.SETUP_DEACTIVATE
    payload = null

    constructor() { }
}

export type Actions
     = SetupStartAction
     | SetupActivateAction
     | SetupDeactivateAction
     | SetupConnectSuccessAction
     | SetupConnectFailAction
     | SetupDetailsSuccessAction
     | SetupDetailsFailAction