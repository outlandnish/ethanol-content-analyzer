import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { Effect, Actions } from '@ngrx/effects'

import { Observable } from 'rxjs/observable'
import { defer } from 'rxjs/observable/defer'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'

import { FlexFuelDevice } from '../models/devices'
import { FlexFuelData } from '../models/flexfuel-data'
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
    
    @Effect({ dispatch: false })
    disconnectFlexFuel: Observable<Action> = defer(() => {
        this.service.disconnect()
    })

    @Effect()
    setupFlexFuel: Observable<Action> = this.actions$
        .ofType(FlexFuelActions.ActionTypes.SETUP_FLEXFUEL)
        .map((action: FlexFuelActions.SetupFlexFuelDeviceAction) => action.payload)
        .switchMap((device) =>
            Observable.fromPromise(this.service.getFlexFuelInfo())
                .debounceTime(5000)
                .map((device: FlexFuelDevice) => new FlexFuelActions.AddFlexFuelDeviceAction(device))
                .catch(error => Observable.of(new FlexFuelActions.DataFlexFuelErrorAction(error)))
        )

    @Effect()
    streamFlexFuel: Observable<Action> = this.actions$
        .ofType(FlexFuelActions.ActionTypes.DATA_FLEXFUEL_STREAM_START)
        .map((action: FlexFuelActions.DataFlexFuelStreamStartAction) => action.payload)
        .switchMap(() =>
            Observable.fromPromise(this.service.stream())
                .map((data: FlexFuelData) => new FlexFuelActions.DataFlexFuelUpdateAction(data))
                .catch(error => Observable.of(new FlexFuelActions.DataFlexFuelErrorAction(error)))
        )

    @Effect()
    stopStreamFlexFuel: Observable<Action> = this.actions$
        .ofType(FlexFuelActions.ActionTypes.DATA_FLEXFUEL_STREAM_END)
        .map((action: FlexFuelActions.DataFlexFuelStreamEndAction) => action.payload)
        .switchMap(() =>
            Observable.fromPromise(this.service.stopStream())
                .map(() => new FlexFuelActions.DisconnectFlexFuelDeviceAction())
                .catch(error => Observable.of(new FlexFuelActions.DataFlexFuelErrorAction(error)))
        )
}