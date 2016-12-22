import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { Effect, Actions } from '@ngrx/effects'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'

import { BluetoothDevice } from '../models/devices'
import * as BluetoothActions from '../actions/bluetooth.actions'
import { FlexFuelMockService } from '../services/flexfuel.mock.service'

@Injectable()
export class BluetoothEffects {
    constructor(
        private actions$: Actions,
        private service: FlexFuelMockService,
    ) { }

    @Effect()
    bluetoothDevices: Observable<Action> = this.actions$
        .ofType(BluetoothActions.ActionTypes.LOAD_PAIRED_BLUETOOTH_DEVICES)
        .startWith(new BluetoothActions.LoadPairedBluetoothDevicesAction())
        .switchMap(() =>
            Observable.fromPromise(this.service.listPairedDevices())
                .map((devices: BluetoothDevice[]) => new BluetoothActions.LoadPairedBluetoothDevicesSuccessAction(devices))
                .catch(error => Observable.of(new BluetoothActions.LoadPairedBluetoothDevicesFailAction(error)))
        );
}