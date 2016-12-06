import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/rx';

import { FlexFuelActions } from '../actions/flexfuel.actions'
import { BluetoothDeviceActions } from '../actions/bluetooth.actions'
import { FlexFuelService } from '../services/flexfuel.service'

@Injectable()
export class FlexFuelEffects {
    constructor(
        private service: FlexFuelService,
        private actions: Actions,
        private flexFuelActions: FlexFuelActions
    ) { }
    
    @Effect() listFlexFuelDevices$ = this.actions
        .ofType(FlexFuelActions.LOAD_FLEX_FUEL_DEVICES)
        .startWith(this.flexFuelActions.loadFlexFuelDevices())
        .switchMap(() => {
            await this.service.getFlexFuelDevices()
        })
}