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
  styles: [`
    .image-container {
      width: 100%;
      height: 40%;
      background-color: #626262;
      padding: 16px;
      margin: 0px;
    }

    .content-container {
      width: 100%;
      padding: 16px;
      margin: 0px;
    }

    ion-toolbar {
      border-top: 1px solid #E51A1F;
    }

    button {
      background-color: transparent;
      font-family: 'Roboto Medium';
      font-weight: '700';
      font-size: 16px;
      color: #E51A1F;
    }

    h1 {
      font-size: 24px;
      font-family: 'Roboto';
      margin: 16px 0px;
      color: #E51A1F;
    }

    p {
      font-size: 16px;
      font-family: 'Roboto';
      margin-bottom: 16px;
    }
  `],
  templateUrl: '../templates/add.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPageComponent {
  _device: FlexFuelDevice
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
    this._device = Object.assign({}, navParams.get('device'), {
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
    this.store.dispatch(new FlexFuelActions.ConnectFlexFuelDeviceAction(this._device))

    this.connected.subscribe(connected => {
      this._connected = connected
      if (this._connected && this._active) {
        this.store.dispatch(new FlexFuelActions.SetupFlexFuelDeviceAction(this._device))
      }
    })

    this.active.subscribe(active => {
      this._active = active
    })

    this.flexFuelDevice.subscribe(device => {
      this._device = device
    })
  }

  done() {
    this.store.dispatch(new FlexFuelActions.DisconnectFlexFuelDeviceAction())
    this.nav.pop()
  }

  cancel() {
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