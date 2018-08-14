[![GitHub tag](https://img.shields.io/github/tag/lomocoin/lomo-rn-boilerplate.svg?style=flat-square)](https://github.com/lomocoin/lomo-rn-boilerplate/tags)
[![GitHub contributors](https://img.shields.io/github/contributors/lomocoin/lomo-rn-boilerplate.svg?style=flat-square)](https://github.com/lomocoin/lomo-rn-boilerplate/contributors)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/lomocoin/lomo-rn-boilerplate/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/lomocoin/lomo-rn-boilerplate.svg?style=flat-square)](https://github.com/lomocoin/lomo-rn-boilerplate/issues)
[![GitHub closed issues](https://img.shields.io/github/issues-closed/lomocoin/lomo-rn-boilerplate.svg?style=flat-square)](https://github.com/lomocoin/lomo-rn-boilerplate/issues-closed)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/lomocoin/lomo-rn-boilerplate.svg?style=flat-square)](https://github.com/lomocoin/lomo-rn-boilerplate/issues-pr)

---

# React Native Boilerplate

## Intro

This React Native boilerplate represent a real world ToDo application example using Typescript for a strongly typed code with AppCenter (CodePush, Analytics and Crashes) for and end-to-user experience.

The project uses Mobx for state management together with . Specifically:

- __State Mangement__
    - [Mobx](https://github.com/mobxjs/mobx)
- __Routing and navigation__
    - [React Navigation](https://github.com/react-navigation/react-navigation) for Tab and Stack navigation
- __Data Caching / Offline__
    - [Mobx Persist](https://github.com/pinqy520/mobx-persist)
- __Internazionalization__
    - [React Native i18n](https://github.com/AlexanderZaytsev/react-native-i18n) using a script to convert Excel file in JSON files
- __UI Components__
    - Custom Button
    - Custom Form
- __Theming and Styles__
    - [Theming](https://github.com/lomocoin/lomo-rn-boilerplate/blob/master/01_THEMING.md) using different Styles, Variables and Images supporting multiple themes folders
- __App Center__
    - [Code Push](https://github.com/lomocoin/lomo-rn-boilerplate/blob/master/02_CODEPUSH.md) CodePush together with Crashes and Analytics
- __Code Linting__ with
    - [TS Lint React](https://github.com/palantir/tslint-react) and guidelines

![](https://github.com/lomocoin/lomo-rn-boilerplate/blob/master/showcase.gif)

---

## Getting Started
#### 1. Clone and Install
_*It's recommended that you use Yarn [Yarn](https://yarnpkg.com) instead of npm and install [React Native Debugger](https://github.com/jhen0409/react-native-debugger/releases) for debugging._

```bash
# Clone the repo
git clone https://github.com/lomocoin/lomo-rn-boilerplate.git

# Install dependencies
yarn
```

#### 2.1. Run the _Mock API_ server
```bash
# Start the mock server in a new terminal
yarn parrot
```
#### 2.2. Run the _React Native_ App
```bash
# Start the iOS platform
yarn ios
# Start the Android platform
yarn android
```

#### 2.3. Login
```bash
# Use the default test account
username: test
password: test
```

## Full list of available commands
#### Utils
- _yarn translations_: generate all the JSON language files from the translations.xls file
- _yarn reset_: reset React Native cache (to fix React Native version mismatch error)
#### iOS
- _yarn ios_: run iOS simulator in Debug mode
- _yarn ios-run-release_: run iOS simulator in Release mode
#### Android
- _yarn android_: run Android in Debug mode on attached device or emulator
- _yarn android-run-release_: run Android Release mode on attached device or emulator
- _yarn android-log_: open react-native log to inspect logcat
#### CodePush
- _yarn ios-codepush_: build an iOS Release version and then push it to AppCenter under Stagging deployment
- _yarn android-codepush_: build an Android Release version and then push it to AppCenter under Stagging deployment
