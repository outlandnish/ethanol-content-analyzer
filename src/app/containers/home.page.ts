import { Component, ChangeDetectionStrategy } from '@angular/core'
import { NavController } from 'ionic-angular'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as fromRoot from '../reducers'
import * as FlexFuelActions from '../actions/flexfuel.actions'
import { FlexFuelDevice, BluetoothDevice } from '../models/devices'
import SetupCardComponent from '../components/setup-card.component'
import FlexFuelCardComponent from '../components/flexfuel-card.component'

import { ViewPageComponent } from './view.page'

@Component({
    selector: 'page-home',
    templateUrl: '../templates/home.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
    public flexFuelDevices: Observable<FlexFuelDevice[]>
    public bluetoothDevices: Observable<BluetoothDevice[]>

    constructor(
        private nav: NavController,
        private store: Store<fromRoot.State>) {
        this.bluetoothDevices = store.select(fromRoot.getBluetoothDevices)
        this.flexFuelDevices = store.select(fromRoot.getFlexFuelDevices)
    }
}