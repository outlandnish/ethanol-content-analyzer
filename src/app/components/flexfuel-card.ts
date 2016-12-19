import { Component, Input } from '@angular/core'
import { NavController } from 'ionic-angular'
import { Store } from '@ngrx/store'

import * as fromRoot from '../reducers'
import * as FlexFuelActions from '../actions/flexfuel.actions'
import { FlexFuelDevice } from '../models/devices'
import { ViewPageComponent } from '../containers/view.page'

@Component({
    selector: 'flexfuel-card',
    template: `
    <md-card *ngIf="(device)">
        <md-card-title-group>
            <img md-card-lg-image src="{{ device.image }}">
            <md-card-title>{{ device.make }} {{ device.model }}</md-card-title>
            <md-card-subtitle>{{ device.mark }} ({{ device.name }})</md-card-subtitle>
        </md-card-title-group>
        <md-card-actions>
            <button md-button (click)="connect(device)">Connect</button>
            <button md-button (click)="remove(device)">Remove</button>
        </md-card-actions>
    </md-card>
    `
})
export class FlexFuelCard {
    @Input()
    device: FlexFuelDevice

    constructor(
        private nav: NavController,
        private store: Store<fromRoot.State>) { }

    connect(device: FlexFuelDevice) {
        this.nav.push(ViewPageComponent, { device })
    }

    remove(device: FlexFuelDevice) {
        this.store.dispatch(new FlexFuelActions.DeleteFlexFuelDeviceAction(device))
    }
}