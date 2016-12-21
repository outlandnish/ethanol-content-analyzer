import { Component, ChangeDetectionStrategy } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { FlexFuelDevice } from '../models/devices'
import { FlexFuelData } from '../models/flexfuel-data'
import * as fromRoot from '../reducers'
import * as FlexFuelActions from '../actions/flexfuel.actions'
import * as ViewActions from '../actions/view.actions'

@Component({
  selector: 'page-view',
  styles: [ `
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
  templateUrl: '../templates/view.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewPageComponent {
  device: FlexFuelDevice
  flexFuelDevice: Observable<FlexFuelDevice>
  connected: Observable<boolean>
  connecting: Observable<boolean>
  streaming: Observable<boolean>
  data: Observable<FlexFuelData>
  error: Observable<boolean>
  active: Observable<boolean>
  _active: boolean
  _connected: boolean
  _data: FlexFuelData

  constructor(
    private nav: NavController,
    private navParams: NavParams,
    private store: Store<fromRoot.State>) {

      // setup some state observables
      this.connected = store.select(fromRoot.getFlexFuelDeviceConnected)
      this.connecting = store.select(fromRoot.getFlexFuelDeviceConnecting)
      this.streaming = store.select(fromRoot.getFlexFuelDeviceStreaming)
      this.flexFuelDevice = store.select(fromRoot.getFlexFuelDevice)
      this.data = store.select(fromRoot.getFlexFuelDeviceData)
      this.active = store.select(fromRoot.getViewActive)
      this.device = navParams.get('device') as FlexFuelDevice

      // a couple events to keep track of (not sure if this is the ngrx/Redux way to do so)
      this.connected.subscribe(connected => {
        this._connected = connected
        if (this._active && this._connected) {
          this.store.dispatch(new FlexFuelActions.DataFlexFuelStreamStartAction())
        }
        else if (this._active && !this._connected)
          this.store.dispatch(new FlexFuelActions.ConnectFlexFuelDeviceAction(this.device))
    })

    this.active.subscribe(active => {
      this._active = active
    })

    this.data.subscribe(data => {
      this._data = data
    })
  }

  ionViewDidEnter() {
    this.store.dispatch(new ViewActions.ViewActivateAction())
  }

  // disconnect when we leave the page
  ionViewWillLeave() {
    this.store.dispatch(new ViewActions.ViewDeactivateAction())
    if (this._connected) {
      this.store.dispatch(new FlexFuelActions.DataFlexFuelStreamEndAction)
    }
  }
}