import { Component, ChangeDetectionStrategy } from '@angular/core'
import { NavController } from 'ionic-angular'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/rx'

import * as fromRoot from '../reducers'
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
    public bluetoothDevices: Observable<BluetoothDevice[]>
    private connecting: Observable<boolean>
    private connected: Observable<boolean>

    constructor(
        private nav: NavController,
        private store: Store<fromRoot.State>) {
        this.bluetoothDevices = store.select(fromRoot.getBluetoothDevices)
        this.flexFuelDevices = store.select(fromRoot.getFlexFuelDevices)
        this.connecting = store.select(fromRoot.getFlexFuelDevicesConnecting)
        this.connected = store.select(fromRoot.getFlexFuelDevicesConnected)

    }

    connect(device: FlexFuelDevice) {
        this.store.dispatch(new FlexFuelActions.ConnectFlexFuelDeviceAction(device))
    }

    remove(device: FlexFuelDevice) {
        this.store.dispatch(new FlexFuelActions.DeleteFlexFuelDeviceAction(device))
    }

    setup(device: BluetoothDevice) {
        //this.nav.push(AddPage, { device: device })
        let flexFuelDevice = Object.assign({}, device, {
            image: null,
            nickname: null,
            vehicle: null,
            version: null
        })
        Object.assign(flexFuelDevice, device)

        this.store.dispatch(new FlexFuelActions.ConnectFlexFuelDeviceAction(flexFuelDevice))
    }

    ignore(device: BluetoothDevice) {
        this.store.dispatch(new BluetoothDeviceActions.HideBluetoothDeviceAction(device))
    }
}