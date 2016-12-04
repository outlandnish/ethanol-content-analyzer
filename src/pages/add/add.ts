import { Component } from '@angular/core'

import { Platform, NavController } from 'ionic-angular'
import { DeliciousTuningService } from '../../services/delicious-tuning.service'
import { StoredDevice, BluetoothDevice } from '../../models/devices'

@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
  providers: [DeliciousTuningService]
})
export class HomePage {
  dtService: DeliciousTuningService

  constructor(public navCtrl: NavController, platform: Platform, deliciousTuningService: DeliciousTuningService) {
    this.dtService = deliciousTuningService
    platform.ready()
      .then(async source => {        
        
      })
  }

  setupDevice(device: BluetoothDevice) {
    let stored = new StoredDevice()
    Object.assign(stored, device)
    this.dtService.addDevice(stored)
  }
}