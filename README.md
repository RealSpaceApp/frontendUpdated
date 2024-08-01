# RealSpace Frontend

## About:
This project is the frontend application for the RealSpace social network, currently under development.

## Technologies used:
- React native

## Android deployed:
- On the "frontendUpdated/android/app/build/outputs/ap/release" folder, download the "app-release.apk" file on your phone
- On your phone, click on the file and follow the installing instructions
- WARNING: For now, to login or create an account asks for the OTP number verification message to Sai

## How to generate a download file for Android to test on your phone:

```bash
# Enter the "android" folder and write this command:
   ./gradlew assembleRelease

# Warning: if you made changes on your code and the assembleRelease command doesn't work, try running "./gradlew clean" first and then "./gradlew assembleRelease"

# After it is completed, get the "app-release.apk" file on the "frontendUpdated/android/app/build/outputs/ap/release" and download this file on your phone
```

## How to run the frontend project locally:
The app's frontend is already deployed, but if you want to run the project in your machine, follow these steps:

```bash
# First, Install Node.js on your computer and it is important to set up an emulator, like Android Studio, and all it's basic configuration for JDK, java and SDK.

# Clone the project's repository (if not already done):
    git clone https://github.com/RealSpaceApp/frontendUpdated.git

# Enter the frontend paste:
    cd ..
    cd frontendUpdated

# Install the app's dependencies:
    npm i

# Run the application (chose ONE of the bellow):
    npx react-native run-android
    npx react-native run-ios

```