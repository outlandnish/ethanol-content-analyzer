import { NgModule, ErrorHandler } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { DBModule } from '@ngrx/db'
import { RouterStoreModule } from '@ngrx/router-store'
import { MaterialModule } from '@angular/material'

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular'
import { Storage } from '@ionic/storage'
import 'hammerjs'

import { ComponentsModule } from '../components'
import { AppComponent } from './app.component'
import { HomePageComponent } from '../containers/home'

import { provideStore } from '@ngrx/store'

import { FlexFuelActions } from 'actions/flexfuel.actions'
import { FlexFuelReducers } from 'reducers/flexfuel.reducers'
import { FlexFuelService } from 'services/flexfuel.service'
import { FlexFuelEffects } from 'effects/flexfuel.effects'

import { routes } from './routes'
import { reducer } from './reducers'


@NgModule({
  declarations: [
    AppComponent,
    HomePage
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(AppComponent),
    MaterialModule.forRoot(),
    ComponentsModule,
    RouterModule.forRoot(routes, { useHash: true }),
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    EffectsModule.run(FlexFuelEffects)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    HomePage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Storage,
    FlexFuelService
  ]
})
export class AppModule { }
