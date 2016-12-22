import { Injectable } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'
import { Observable } from 'rxjs/Rx'
import { Store } from '@ngrx/store'
import * as fromRoot from '../reducers'
import * as FlexFuelActions from '../actions/flexfuel.actions'
import * as _ from 'lodash'

import { BluetoothDevice, FlexFuelDevice, Vehicle } from '../models/devices'
import { FlexFuelData } from '../models/flexfuel-data'

@Injectable()
export class FlexFuelMockService {
    streamer: Observable<any>

    constructor(
        private store: Store<fromRoot.State>
    ) { }

    async listPairedDevices(): Promise<BluetoothDevice[]> {
        let devices = [{
            name: 'DT-00592',
            id: 'fsadfasdfsda',
            address: 'fasfasdf',
            class: 123
        }]

        devices = devices.filter(d => d.name.indexOf('DT-') == 0)
        let flexFuelDevices = this.store.select(fromRoot.getFlexFuelDevices).takeLast(1)
        return _.differenceBy(flexFuelDevices, devices, 'id')
    }

    async connect(device: FlexFuelDevice) {

    }

    async disconnect() {

    }

    async getFlexFuelInfo(): Promise<FlexFuelDevice> {
        return {
            name: 'DT-00592',
            id: 'fsadfasdfsda',
            address: 'fasfasdf',
            class: 123,
            vehicle: {
                id: 'BRZ/FR-S/86 - Mk1+',
                make: 'Subaru',
                model: 'BRZ',
                version: '001',
                mark: 'Mark 1+',
                image: 'assets/dt.png'
            }
        }
    }

    async stream() {
        return new Promise((resolve, reject) => {
            this.streamer = Observable
                .range(1, 10000)
                .timeInterval()
                .flatMap(x => {
                    return Observable
                        .of({ hasEthanol: true, hasFuelPressure: true, ethanol: this.random(5, 85), fuelPressure: this.random(0, 100), vehicle: null })
                        .delay(this.random(100, 2000))
                })
            this.streamer.subscribe(
                data => {
                    this.store.dispatch(new FlexFuelActions.DataFlexFuelUpdateAction(data))
                },
                error => {
                    this.store.dispatch(new FlexFuelActions.DataFlexFuelErrorAction(error))
                })
            resolve({ hasEthanol: true, hasFuelPressure: true, ethanol: this.random(5, 85), fuelPressure: this.random(0, 100), vehicle: null })
        })
    }

    async stopStream() {
        // STUB
    }

    random(bottom, top) {
        return Math.floor(Math.random() * (1 + top - bottom)) + bottom;
    }
}