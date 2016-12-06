import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import * as BluetoothActions from '../actions/bluetooth.actions'
import { FlexFuelService } from '../services/flexfuel.service'

@Injectable()
export class BluetoothEffects {
    constructor(
        private service: FlexFuelService,
        private actions: Actions,
    ) { }

    @Effect() loadBluetoothDevices = this.actions
        .ofType(BluetoothActions.ActionTypes.LOAD_PAIRED_BLUETOOTH_DEVICES)
        .startWith(new BluetoothActions.LoadPairedBluetoothDevicesAction(null))
        .switchMap(async () => {
            await this.service.listPairedDevices()
        })
}