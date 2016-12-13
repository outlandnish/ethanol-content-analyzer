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
    flexFuelDevices: Observable<Action> = this.actions$
        .ofType(FlexFuelActions.ActionTypes.LOAD_FLEXFUEL)
        .startWith(new FlexFuelActions.LoadFlexFuelDevicesAction)
        .switchMap(() =>
            Observable.fromPromise(this.service.listPairedDevices())
                .map((devices: FlexFuelDevice[]) => new FlexFuelActions.LoadFlexFuelDevicesSuccessAction(devices))
                .catch(error => Observable.of(new FlexFuelActions.LoadFlexFuelDevicesFailAction(error)))
        )

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
}