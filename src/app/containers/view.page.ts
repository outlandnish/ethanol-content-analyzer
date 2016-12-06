import { Component, ChangeDetectionStrategy } from '@angular/core'
import { NavController } from 'ionic-angular'
import { Store } from '@ngrx/store'

import * as fromRoot from '../reducers'

@Component({
  selector: 'page-view',
  templateUrl: '../templates/view.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewPageComponent {
  constructor(
        private nav: NavController,
        private store: Store<fromRoot.State>) {
    }
}