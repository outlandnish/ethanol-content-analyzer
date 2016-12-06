import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Modal, NavController } from 'ionic-angular'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/rx'

import { AppState } from '../services/app-state'

@Component({
    selector: 'page-view',
    templateUrl: '../templates/view.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewPageComponent {
}