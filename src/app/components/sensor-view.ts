import { Component, Input, OnChanges, SimpleChange, ChangeDetectionStrategy } from '@angular/core'
import { NavController } from 'ionic-angular'

@Component({
    selector: 'sensor-view',
    template: `
    <div class='sensor-view'>
        <!-- graph goes here -->
        <p class="sensor-value" [ngStyle]="{'color': 'rgb(' + red + ',' + blue + ',' + green + ')'}">{{ value | number: '1.0-2' }}</p>
        <p class="sensor-label">{{ measurement }}</p>
        <p class="sensor-value" [ngStyle]="{'color': 'rgb(' + red + ',' + blue + ',' + green + ')'}">{{ valueMax | number: '1.0-2' }}</p>
        <p class="sensor-label">max</p>
        <p class="sensor-value" [ngStyle]="{'color': 'rgb(' + red + ',' + blue + ',' + green + ')'}">{{ average | number: '1.0-2' }}</p>
        <p class="sensor-label">average</p>
        <p class="sensor-value" [ngStyle]="{'color': 'rgb(' + red + ',' + blue + ',' + green + ')'}">{{ valueMin | number: '1.0-2' }}</p>
        <p class="sensor-label">min</p>
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
        text-align: center;
    }

    .sensor-value {
        margin-bottom: 8px;
        font-family: 'Roboto Medium'
        font-size: 16px;
        text-align: center;
    }
    `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SensorView implements OnChanges {
    @Input()
    value: number
    @Input()
    measurement: string
    @Input()
    max: number
    @Input()
    red: number = 0
    @Input()
    blue: number = 0
    @Input()
    green: number = 0

    average: number = 0
    valueCount: number = 0
    valueMin: number
    valueMax: number

    constructor(
        private nav: NavController) { }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        for (let propName in changes) {
            let changedProp = changes[propName]
            if (propName == 'value')
                this.setValue(changedProp)
        }
    }

    setValue(value) {
        if (!isNaN(this.value)) {
            this.valueCount += 1
            this.average = ((this.average * (this.valueCount - 1)) + this.value) / this.valueCount
            this.valueMin = this.valueMin ? Math.min(this.valueMin, this.value) : this.value
            this.valueMax = this.valueMax ? Math.max(this.valueMax, this.value) : this.value
        }
    }
}