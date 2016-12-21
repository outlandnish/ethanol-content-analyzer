export interface BluetoothDevice {
    class: number
    id: string
    address: string
    name: string
}

export interface FlexFuelDevice extends BluetoothDevice {
    vehicle: Vehicle
}

export interface Vehicle {
    id: string
    make: string
    model: string
    version: string
    mark: string
    image?: string
}