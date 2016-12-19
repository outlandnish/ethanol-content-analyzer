import { Component, Input } from '@angular/core'
import { FlexFuelDevice } from '../models/devices'

@Component({
    selector: 'flexfuel-list',
    template: `
    <flexfuel-card *ngFor="let device of devices" [device]="device"></flexfuel-card>
    `
})
export class FlexFuelList {
    @Input()
    devices: FlexFuelDevice[]

    constructor() { }
}