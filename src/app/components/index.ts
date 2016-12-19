
import { NgModule } from '@angular/core'
import { MaterialModule } from '@angular/material'
import { CommonModule } from '@angular/common'

import { SetupCardComponent } from './setup-card.component'
import { FlexFuelCardComponent } from './flexfuel-card.component'

export const COMPONENTS = [
    SetupCardComponent,
    FlexFuelCardComponent
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