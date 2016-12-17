import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { Effect, Actions } from '@ngrx/effects'

import { Observable } from 'rxjs/Rx'

import { FlexFuelDevice } from '../models/devices'
import * as FlexFuelActions from '../actions/flexfuel.actions'
import { FlexFuelService } from '../services/flexfuel.service'

@Injectable()
export class FlexFuelEffects {
    constructor(
        private actions$: Actions,
        private service: FlexFuelService,
    ) { }

    @Effect()
    connectFlexFuel: Observable<Action> = this.actions$
        .ofType(FlexFuelActions.ActionTypes.CONNECT_FLEXFUEL)
        .map((action: FlexFuelActions.ConnectFlexFuelDeviceAction) => action.payload)
        .switchMap((device) =>
            Observable.fromPromise(this.service.connect(device))
                .map(() => new FlexFuelActions.ConnectFlexFuelDeviceSuccessAction())
                .catch(error => Observable.of(new FlexFuelActions.ConnectFlexFuelDeviceFailAction(error)))
        )

    @Effect()
    setupFlexFuel: Observable<Action> = this.actions$
        .ofType(FlexFuelActions.ActionTypes.SETUP_FLEXFUEL)
        .map((action: FlexFuelActions.SetupFlexFuelDeviceAction) => action.payload)
        .switchMap((device) =>
            Observable.fromPromise(this.service.getFlexFuelInfo())
                .map((device: FlexFuelDevice) => new FlexFuelActions.AddFlexFuelDeviceAction(device))
                .catch(error => Observable.of(new FlexFuelActions.DataFlexFuelErrorAction(error)))
        )

    @Effect()
    addFlexFuel: Observable<Action> = this.actions$
        .ofType(FlexFuelActions.ActionTypes.ADD_FLEXFUEL)
        .map((action: FlexFuelActions.AddFlexFuelDeviceAction) => action.payload)
        .switchMap((device) =>
            Observable.fromPromise(this.service.getFlexFuelInfo())
                .map((device: FlexFuelDevice) => new FlexFuelActions.AddFlexFuelDeviceAction(device))
                .catch(error => Observable.of(new FlexFuelActions.DataFlexFuelErrorAction(error)))
        )
    
    @Effect()
    removeFlexFuel: Observable<Action> = this.actions$
        .ofType(FlexFuelActions.ActionTypes.DELETE_FLEXFUEL)
        .map((action: FlexFuelActions.DeleteFlexFuelDeviceAction) => action.payload)
        .switchMap((device) =>
            Observable.fromPromise(this.service.getFlexFuelInfo())
                .map((device: FlexFuelDevice) => new FlexFuelActions.AddFlexFuelDeviceAction(device))
                .catch(error => Observable.of(new FlexFuelActions.DataFlexFuelErrorAction(error)))
        )
}