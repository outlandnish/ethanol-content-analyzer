export interface BluetoothDevice {
    class: number
    id: string
    address: string
    name: string
}

export interface FlexFuelDevice extends BluetoothDevice {
    vehicle: string
    version: string
}