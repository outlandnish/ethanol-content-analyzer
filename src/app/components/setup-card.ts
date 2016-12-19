import { Component, Input } from '@angular/core'
import { NavController } from 'ionic-angular'
import { BluetoothDevice } from '../models/devices'
import { AddPageComponent } from '../containers/add.page'

@Component({
    selector: 'setup-card',
    template: `
    <md-card>
        <md-card-title-group>
            <img md-card-sm-image src="assets/dt.png">
            <md-card-title>{{ device.name }}</md-card-title>
            <md-card-subtitle>Setup required</md-card-subtitle>
        </md-card-title-group>
        <md-card-actions>
            <button md-button (click)="setup(device)">Setup</button>
        </md-card-actions>
    </md-card>
    `
})
export class SetupCard {
    @Input()
    device: BluetoothDevice

    constructor(private nav: NavController) { }

    setup(device: BluetoothDevice) {
        this.nav.push(AddPageComponent, { device })
    }
}