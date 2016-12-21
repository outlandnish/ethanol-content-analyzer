import { Component, Input } from '@angular/core'
import { NavController } from 'ionic-angular'
import { BluetoothDevice } from '../models/devices'
import { AddPageComponent } from '../containers/add.page'

@Component({
    selector: 'setup-card',
    template: `
    <div class='sensor-view'>
        <!-- graph goes here -->
        <span class="sensor-label" style="color: {{ color }}">{{ measurement }}</span>
        <span class="sensor-value">{{ _max }}</span>
        <span class="sensor-label" style="color: {{ color }}">max</span>
        <span class="sensor-value">{{ _average }}</span>
        <span class="sensor-label" style="color: {{ color }}">average</span>
        <span class="sensor-value">{{ _min }}</span>
        <span class="sensor-label">min</span>
    </div>
    `,
    styles: [`
    .sensor-view {

    }

    .sensor-label {
        margin-bottom: 16px;
        font-family: 'Roboto Medium';
        font-size: 12px;
        font-style: italic;
    }

    .sensor-value {
        margin-bottom: 8px;
        font-family: 'Roboto Medium'
        font-size: 16px;
    }
    `
    ]
})
export class SensorView {
    @Input()
    set value(value: number) {
        if (!isNaN(value)) {
            this._value = value
            this._valueCount += 1
            this._average = ((this._average * (this._valueCount - 1)) + this._value) / this._valueCount
            this._min = this._min ? Math.min(this._min, value) : value
            this._max = this._max ? Math.max(this._max, value) : value
        }
    }
    @Input()
    measurement: string
    @Input()
    max: number
    @Input()
    color: string

    _value: number
    _average: number = 0
    _valueCount: number = 0
    _min: number
    _max: number

    constructor(private nav: NavController) { }

    setup(device: BluetoothDevice) {
        this.nav.push(AddPageComponent, { device })
    }
}