# Ethanol Content Analyzer
Here lies a mobile app to analyze the ethanol content and fuel pressure in a car using the Delicious Tuning Flex Fuel Kit.

Built on Ionic 2 + Angular 2, this is my first attempt at an app using ngrx and the Redux pattern.

## Required Dependencies
- Ionic 2 CLI (`npm install -g ionic`)
- Android SDK

## Setup
- `npm install`
- `ionic platform add android` (iOS support once Delicious Tuning gets an MFi certified Bluetooth chip or uses BLE instead)
- `ionic plugin add cordova-plugin-bluetooth-serial`

## Development
- `ionic run android --livereload`

*note*: As of this writing, `ionic serve` does not work because cordova plugins do not get loaded. You may be able to mock the Bluetooth functionality.