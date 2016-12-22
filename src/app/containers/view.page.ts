import { Component, ChangeDetectionStrategy } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { State } from '../reducers/flexfuel.reducer'

import { FlexFuelDevice } from '../models/devices'
import { FlexFuelData } from '../models/flexfuel-data'
import * as fromRoot from '../reducers'
import * as FlexFuelActions from '../actions/flexfuel.actions'
import * as ViewActions from '../actions/view.actions'

@Component({
  selector: 'page-view',
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

    ion-grid {
      margin-top: 16px;
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
  flexFuelState: Observable<State>
  connected: Observable<boolean>
  ethanol: Observable<number>
  fuelPressure: Observable<number>
  hasEthanol: Observable<boolean>
  hasFuelPressure: Observable<boolean>
  error: Observable<boolean>
  active: Observable<boolean>
  _active: boolean
  _state: State
  _hasEthanol: boolean = false
  _hasFuelPressure: boolean = false

  constructor(
    private nav: NavController,
    private navParams: NavParams,
    private store: Store<fromRoot.State>) {

    // setup some state observables
    this.flexFuelState = store.select(fromRoot.getFlexFuelDevicesState)
    this.connected = store.select(fromRoot.getFlexFuelDeviceConnected)
    this.ethanol = store.select(fromRoot.getFlexFuelEthanol)
    this.fuelPressure = store.select(fromRoot.getFlexFuelFuelPressure)
    this.hasEthanol = store.select(fromRoot.getFlexFuelHasEthanol)
    this.hasFuelPressure = store.select(fromRoot.getFlexFuelHasFuelPressure)
    this.active = store.select(fromRoot.getViewActive)
    this.device = navParams.get('device') as FlexFuelDevice

    this.active.subscribe(active => {
      this._active = active
    })

    this.flexFuelState.subscribe(state => {
      this._state = state
    })
  }

  ionViewDidEnter() {
    this.store.dispatch(new ViewActions.ViewActivateAction())

    this.connected.subscribe(connected => {
      console.log('connected changed', connected)
      console.log('active', this._active)
      if (this._active && connected) {
        console.log('request start streaming')
        this.store.dispatch(new FlexFuelActions.DataFlexFuelStreamStartAction())
      }
      else if (this._active && !connected)
        console.log('request connection')
        this.store.dispatch(new FlexFuelActions.ConnectFlexFuelDeviceAction(this.device))
    })
  }

  // disconnect when we leave the page
  ionViewWillLeave() {
    this.store.dispatch(new ViewActions.ViewDeactivateAction())
    if (this._state.connected) {
      this.store.dispatch(new FlexFuelActions.DataFlexFuelStreamEndAction)
    }
  }
}