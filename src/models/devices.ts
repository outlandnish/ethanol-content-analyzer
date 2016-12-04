export class BluetoothDevice {
    class: number
    id: string
    address: string
    name: string
}

export class StoredDevice extends BluetoothDevice {
    image: string
    nickname: string
    vehicle: string = 'Subaru BRZ'
}