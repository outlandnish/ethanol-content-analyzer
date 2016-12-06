import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import * as FlexFuelActions from '../actions/flexfuel.actions'
import { FlexFuelService } from '../services/flexfuel.service'

@Injectable()
export class FlexFuelEffects {
    constructor(
        private service: FlexFuelService,
        private actions: Actions,
    ) { }

    @Effect() listFlexFuelDevices$ = this.actions
        .ofType(FlexFuelActions.ActionTypes.LOAD_FLEXFUEL)
        .startWith(new FlexFuelActions.LoadFlexFuelDevicesAction())
        .switchMap(async () => {
            await this.service.getFlexFuelDevices()
        })
}