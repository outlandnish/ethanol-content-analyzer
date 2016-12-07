import { Component, ChangeDetectionStrategy } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/rx'

import * as fromRoot from '../reducers'
import * as FlexFuelActions from '../actions/flexfuel.actions'
import { FlexFuelDevice } from '../models/devices'

@Component({
  selector: 'page-add',
  templateUrl: '../templates/add.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPageComponent {
  device: FlexFuelDevice
  flexFuelDevice: Observable<FlexFuelDevice>
  connected: Observable<boolean>
  connecting: Observable<boolean>

  constructor(
    private nav: NavController,
    private navParams: NavParams,
    private store: Store<fromRoot.State>) {
      this.device = Object.assign({}, navParams.get('device'), {
        image: null,
        nickname: null,
        vehicle: null,
        version: null
      })

      this.flexFuelDevice = store.select(fromRoot.getFlexFuelDevice)
      this.connected = store.select(fromRoot.getFlexFuelDevicesConnected)
      this.connecting = store.select(fromRoot.getFlexFuelDevicesConnecting)
  }

  connect() {
    this.store.dispatch(new FlexFuelActions.ConnectFlexFuelDeviceAction(this.device))
  }

  setup() {
    this.store.dispatch(new FlexFuelActions.SetupFlexFuelDeviceAction(this.device))
  }
}