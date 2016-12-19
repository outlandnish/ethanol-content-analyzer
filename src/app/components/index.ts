
import { NgModule } from '@angular/core'
import { MaterialModule } from '@angular/material'

import { SetupCardComponent } from './setup-card.component'

export const COMPONENTS = [
    SetupCardComponent
]

@NgModule({
  imports: [
    MaterialModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }