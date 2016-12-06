import { NgModule, ErrorHandler } from '@angular/core'
import { CommonModule } from '@angular/common'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { MaterialModule } from '@angular/material'

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular'
import { Storage } from '@ionic/storage'
import 'hammerjs'

import { AppComponent } from './app.component'
import { HomePageComponent } from './containers/home.page'

import { FlexFuelService } from './services/flexfuel.service'
import { FlexFuelEffects } from './effects/flexfuel.effects'
import { BluetoothEffects } from './effects/bluetooth.effects'

import { reducer } from './reducers'


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(AppComponent),
    MaterialModule.forRoot(),
    StoreModule.provideStore(reducer),
    EffectsModule.run(FlexFuelEffects),
    EffectsModule.run(BluetoothEffects)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    HomePageComponent
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Storage,
    FlexFuelService
  ]
})
export class AppModule { }
