import { FlexFuelDevice, BluetoothDevice } from '../models/devices'

export interface AppState {
    flexFuelDevices: FlexFuelDevice[]
    bluetoothDevices: BluetoothDevice[]
}