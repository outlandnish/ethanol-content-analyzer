export interface BluetoothDevice {
    class: number
    id: string
    address: string
    name: string
}

export interface FlexFuelDevice extends BluetoothDevice {
    image: string
    nickname: string
    vehicle: string
    version: string
}