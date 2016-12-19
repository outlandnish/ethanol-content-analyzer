import { Component, Input } from '@angular/core'
import { BluetoothDevice } from '../models/devices'

@Component({
    selector: 'setup-list',
    template: `
    <setup-card *ngFor="let device of devices" [device]="device"></setup-card>
    `
})
export class SetupList {
    @Input()
    devices: BluetoothDevice[]

    constructor() { }
}