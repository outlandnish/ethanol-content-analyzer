import { Component, EventEmitter } from '@angular/core'

import { Store } from '@ngrx/store'

import { Platform } from 'ionic-angular'
import { StatusBar, Splashscreen } from 'ionic-native'

import * as fromRoot from './reducers'
import { HomePage } from '../pages/home/home'


@Component({
  templateUrl: 'app.html'
})
export class AppComponent {
  rootPage = HomePage

  constructor(platform: Platform, private store: Store<fromRoot.State>) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault()
      Splashscreen.hide()
    })
  }
}
