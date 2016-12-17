import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { Effect, Actions } from '@ngrx/effects'

import { Observable } from 'rxjs/Rx'

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
    
    disconnectFlexFuel: Observable<Action> = this.actions$
        .ofType(FlexFuelActions.ActionTypes.DISCONNECT_FLEXFUEL)
        .map((action: FlexFuelActions.DisconnectFlexFuelDeviceAction) => action.payload)
        .switchMap(() =>
            Observable.fromPromise(this.service.disconnect())
                .map((success: boolean) => new FlexFuelActions.DisconnectFlexFuelDeviceCompletedAction(success))
                .catch(error => Observable.of(new FlexFuelActions.ConnectFlexFuelDeviceFailAction(error)))
        )

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

    streamFlexFuel: Observable<Action> = this.actions$
        .ofType(FlexFuelActions.ActionTypes.DATA_FLEXFUEL_STREAM_START)
        .map((action: FlexFuelActions.DataFlexFuelStreamStartAction) => action.payload)
        .switchMap(() =>
            Observable.fromPromise(this.service.stream())
                .map((data: FlexFuelData) => new FlexFuelActions.DataFlexFuelUpdateAction(data))
                .catch(error => Observable.of(new FlexFuelActions.DataFlexFuelErrorAction(error)))
        )

    stopStreamFlexFuel: Observable<Action> = this.actions$
        .ofType(FlexFuelActions.ActionTypes.DATA_FLEXFUEL_STREAM_END)
        .map((action: FlexFuelActions.DataFlexFuelStreamEndAction) => action.payload)
        .switchMap(() =>
            Observable.fromPromise(this.service.stopStream())
                .map(() => new FlexFuelActions.DisconnectFlexFuelDeviceAction())
                .catch(error => Observable.of(new FlexFuelActions.DataFlexFuelErrorAction(error)))
        )
}