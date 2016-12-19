import { Component, ChangeDetectionStrategy } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as fromRoot from '../reducers'
import * as FlexFuelActions from '../actions/flexfuel.actions'
import * as SetupActions from '../actions/setup.actions'
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
  view: Observable<string>
  active: Observable<boolean>
  _active: boolean
  _connected: boolean

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
    this.view = store.select(fromRoot.getSetupView)
    this.active = store.select(fromRoot.getSetupActive)
    this.connected = store.select(fromRoot.getFlexFuelDeviceConnected)
    this.store.dispatch(new SetupActions.SetupStartAction())
  }

  connect() {
    this.store.dispatch(new SetupActions.SetupConnectAction())
    this.store.dispatch(new FlexFuelActions.ConnectFlexFuelDeviceAction(this.device))

    this.connected.subscribe(connected => {
      this._connected = connected
      if (this._connected && this._active) {
        this.store.dispatch(new FlexFuelActions.SetupFlexFuelDeviceAction(this.device))
      }
    })

    this.active.subscribe(active => {
      this._active = active
    })
  }

  done() {
    this.store.dispatch(new FlexFuelActions.DisconnectFlexFuelDeviceAction())
    this.nav.pop()
  }

  ionViewDidEnter() {
    this.store.dispatch(new SetupActions.SetupActivateAction())
  }

  // disconnect when we leave the page
  ionViewWillLeave() {
    this.store.dispatch(new SetupActions.SetupDeactivateAction())
    if (this._connected) {
      this.store.dispatch(new FlexFuelActions.DisconnectFlexFuelDeviceAction())
    }
  }
}