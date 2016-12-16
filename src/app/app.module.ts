import { NgModule, ErrorHandler } from '@angular/core'
import { CommonModule } from '@angular/common'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { MaterialModule } from '@angular/material'

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular'
import 'hammerjs'

import { AppComponent } from './app.component'
import { HomePageComponent } from './containers/home.page'
import { AddPageComponent } from './containers/add.page'
import { ViewPageComponent } from './containers/view.page'

import { FlexFuelService } from './services/flexfuel.service'
import { FlexFuelEffects } from './effects/flexfuel.effects'
import { BluetoothEffects } from './effects/bluetooth.effects'

import { reducer } from './reducers'


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AddPageComponent,
    ViewPageComponent
  ],
  imports: [
    IonicModule.forRoot(AppComponent),
    CommonModule,
    MaterialModule.forRoot(),
    StoreModule.provideStore(reducer),
    EffectsModule.run(BluetoothEffects),
    EffectsModule.run(FlexFuelEffects)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    HomePageComponent,
    AddPageComponent,
    ViewPageComponent
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FlexFuelService
  ]
})
export class AppModule { }
