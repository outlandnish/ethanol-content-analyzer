export interface BluetoothDevice {
    class: number
    id: string
    address: string
    name: string
}

export class FlexFuelDevice implements BluetoothDevice {
    image: string
    nickname: string
    vehicle: string
}