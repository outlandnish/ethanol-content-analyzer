import { Component, ChangeDetectionStrategy } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/rx'

import { FlexFuelDevice } from '../models/devices'
import { FlexFuelData } from '../models/flexfuel-data'
import * as fromRoot from '../reducers'
import * as FlexFuelActions from '../actions/flexfuel.actions'

@Component({
  selector: 'page-view',
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

  constructor(
    private nav: NavController,
    private navParams: NavParams,
    private store: Store<fromRoot.State>) {
    this.connected = store.select(fromRoot.getFlexFuelDeviceConnected)
    this.connecting = store.select(fromRoot.getFlexFuelDeviceConnecting)
    this.streaming = store.select(fromRoot.getFlexFuelDeviceStreaming)
    this.flexFuelDevice = store.select(fromRoot.getFlexFuelDevice)
    this.data = store.select(fromRoot.getFlexFuelDeviceData)

    this.device = navParams.get('device') as FlexFuelDevice

    this.connected.subscribe(connected => {
      console.log('connected', connected)
      if (connected) {
        this.store.dispatch(new FlexFuelActions.DataFlexFuelStreamStartAction())
      }
      else {
        this.store.dispatch(new FlexFuelActions.ConnectFlexFuelDeviceAction(this.device))
      }
    })
  }

  // disconnect when we leave the page
  ionViewWillLeave() {
    if (this.connected.last())
      this.store.dispatch(new FlexFuelActions.DisconnectFlexFuelDeviceAction())
  }
}