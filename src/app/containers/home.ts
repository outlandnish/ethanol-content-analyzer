import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Modal, NavController } from 'ionic-angular'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/rx'

import { AppState } from '../services/app-state'
import * as FlexFuelActions from '../actions/flexfuel.actions'
import * as BluetoothDeviceActions from '../actions/bluetooth.actions'
import { FlexFuelDevice, BluetoothDevice } from '../models/devices'

@Component({
  selector: 'page-home',
  templateUrl: '../templates/home.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
    public flexFuelDevices: Observable<FlexFuelDevice[]>

    constructor(
        private nav: NavController,
        private store: Store<AppState>) {
    }

    ionViewLoaded() {
        this.flexFuelDevices = this.store.select(state => state.flexFuelDevices)
    }

    connect(device: FlexFuelDevice) {
        this.store.dispatch(new FlexFuelActions.ConnectFlexFuelDeviceAction(device))
    }

    remove(device: FlexFuelDevice) {
        this.store.dispatch(new FlexFuelActions.DeleteFlexFuelDeviceAction(device))
    }

    setup(device: BluetoothDevice) {
        //this.nav.push(AddPage, { device: device })
        let flexFuelDevice = new FlexFuelDevice()
        Object.assign(flexFuelDevice, device)
        this.store.dispatch(new FlexFuelActions.SetupFlexFuelDeviceAction(flexFuelDevice))
    }

    ignore(device: BluetoothDevice) {
        this.store.dispatch(new BluetoothDeviceActions.HideBluetoothDeviceAction(device))
    }
}