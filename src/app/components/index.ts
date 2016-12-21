
import { NgModule } from '@angular/core'
import { MaterialModule } from '@angular/material'
import { CommonModule } from '@angular/common'

import { SetupCard } from './setup-card'
import { SetupList } from './setup-list'
import { FlexFuelCard } from './flexfuel-card'
import { FlexFuelList } from './flexfuel-list'
import { SensorView } from './sensor-view'

export const COMPONENTS = [
    SetupCard,
    SetupList,
    FlexFuelCard,
    FlexFuelList,
    SensorView
]

@NgModule({
  imports: [
    MaterialModule,
    CommonModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }