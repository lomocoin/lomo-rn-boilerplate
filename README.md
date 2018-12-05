[![GitHub tag](https://img.shields.io/github/tag/lomocoin/lomo-rn-boilerplate.svg?style=flat-square)](https://github.com/lomocoin/lomo-rn-boilerplate/tags)
[![GitHub contributors](https://img.shields.io/github/contributors/lomocoin/lomo-rn-boilerplate.svg?style=flat-square)](https://github.com/lomocoin/lomo-rn-boilerplate/contributors)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/lomocoin/lomo-rn-boilerplate/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/lomocoin/lomo-rn-boilerplate.svg?style=flat-square)](https://github.com/lomocoin/lomo-rn-boilerplate/issues)
[![GitHub closed issues](https://img.shields.io/github/issues-closed/lomocoin/lomo-rn-boilerplate.svg?style=flat-square)](https://github.com/lomocoin/lomo-rn-boilerplate/issues-closed)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/lomocoin/lomo-rn-boilerplate.svg?style=flat-square)](https://github.com/lomocoin/lomo-rn-boilerplate/issues-pr)

---

# React Native Boilerplate

## Intro

This React Native boilerplate represent a complete ToDo application example using Typescript for a strongly typed code and many others library accurately configured from Debugging to Release.

The project uses Mobx State Tree for state management, AppCenter (CodePush, Analytics and Crashes) for build and CI, and many others:

- **State Management**
  - [Mobx](https://github.com/mobxjs/mobx) Simple, scalable state management
  - [Mobx State Tree](https://github.com/mobxjs/mobx-state-tree) Model Driven State Management
- **Routing and navigation**
  - [React Navigation](https://github.com/react-navigation/react-navigation) using Switch, Tab and Stack navigation
- **Internationalization**
  - [React Native Languages](https://github.com/react-community/react-native-languages) for detect app language changes
  - [i18next](https://github.com/i18next/i18next) to handle translations keys
- **UI Components**
  - Custom Button
  - Custom Form
- **Custom Font Icons**
  - [React Vector Icons](https://github.com/oblador/react-native-vector-icons) to use icons as fonts
  - [IcoMoon](https://icomoon.io/app/) to manage the app icons as export it as a ttf font
- **Theming and Styles**
  - [Theming](./01_THEMING.md) custom structure using different Styles, Variables and Images supporting multiple themes folders
- **App Center**
  - [Code Push](./02_CODEPUSH.md) CodePush together with Crashes and Analytics
  - [CodePushUtils](./src/utils/CodePush.ts) to dynamically set deployment Key and check for updates
- **Code Linting** with
  - [TS Lint React](https://github.com/palantir/tslint-react) and guidelines
  - [CommitLint](https://github.com/marionebl/commitlint) to check the commit message format
  - [Prettier]() format the code in a standard way
- **Debugging**
  - [Reactotron](https://github.com/infinitered/reactotron)
- **Release**
  - [standard-version](https://github.com/conventional-changelog/standard-version) with one command (yarn release) release a new version, create changelog and tag a new release
  - [React Native Version](https://github.com/stovmascript/react-native-version) to update the iOs and Android native version number

![](https://github.com/lomocoin/lomo-rn-boilerplate/blob/master/showcase.gif)

---

## Getting Started

#### 1. Clone and Install

_\*It's recommended that you use Yarn [Yarn](https://yarnpkg.com) instead of npm and install [Reactotron](https://github.com/infinitered/reactotron/releases) for inspecting the app store and actions._

```bash
# Install CocoaPods
sudo gem install cocoapods

# Clone the repository
git clone https://github.com/lomocoin/lomo-rn-boilerplate.git

# Install app dependencies
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
- _yarn clear_: Hard clear all the cache, iOs Pods, node_modules and reinstall the app dependencies
- _yarn fonts_: copy fonts in android project and generate the Icon.ts file with a list of all available icons.

#### Release

- _yarn release_: automatically bump version number, create changelog and tag a new version (add _--release-as 1.0.0_ to specified a version number)
- _yarn release-push_: push release tag to GitHub

#### iOS

- _yarn ios_: run iOS simulator in Debug mode
- _yarn ios-run-release_: run iOS simulator in Release mode

#### Android

- _yarn android_: run Android in Debug mode on attached device or emulator
- _yarn android-run-release_: run Android Release mode on attached device or emulator
- _yarn android-log_: open react-native log to inspect logcat

#### CodePush

- _yarn ios-codepush_: build an iOS Release version and then push it to AppCenter under Staging deployment
- _yarn android-codepush_: build an Android Release version and then push it to AppCenter under Staging deployment

## Todos

- Writing Unit Testing
- Integrate End-To-End testing with Detox
