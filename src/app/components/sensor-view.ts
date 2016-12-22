import { Component, Input, OnChanges, SimpleChange } from '@angular/core'
import { NavController } from 'ionic-angular'

@Component({
    selector: 'sensor-view',
    template: `
    <div class='sensor-view' *ngIf="(_value)">
        <!-- graph goes here -->
        <span class="sensor-label" [style.color]="'color: ' + _rgb">{{ measurement }}</span>
        <span class="sensor-value">{{ _max }}</span>
        <span class="sensor-label" [style.color]="'color: ' + _rgb">max</span>
        <span class="sensor-value">{{ _average }}</span>
        <span class="sensor-label">average</span>
        <span class="sensor-value" [style.color]="'color: ' + _rgb">{{ _min }}</span>
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
export class SensorView implements OnChanges {
    @Input()
    value: number
    @Input()
    measurement: string
    @Input()
    max: number
    @Input()
    set red(value: number) {
        this._rgb = `rgb(${value}, ${this.green}, ${this.blue})`
    }
    @Input()
    set blue(value: number) {
        this._rgb = `rgb(${this.red}, ${this.green}, ${value})`
    }
    @Input()
    set green(value: number) {
        this._rgb = `rgb(${this.red}, ${value}, ${this.blue})`
    }

    _value: number
    _average: number = 0
    _valueCount: number = 0
    _min: number
    _max: number
    _rgb: string = `rgb(${this.red}, ${this.green}, ${this.blue})`

    constructor(private nav: NavController) { }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {

        for (let propName in changes) {
            let changedProp = changes[propName]
            if (propName == 'value')
                this.setValue(changedProp)
        }
    }

    setValue(value) {
        console.log('setting value', value)
        if (!isNaN(value)) {
            this._value = value
            this._valueCount += 1
            this._average = ((this._average * (this._valueCount - 1)) + this._value) / this._valueCount
            this._min = this._min ? Math.min(this._min, value) : value
            this._max = this._max ? Math.max(this._max, value) : value
        }
    }
}