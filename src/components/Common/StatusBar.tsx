import React, { PureComponent } from 'react';
import { StatusBar as NativeStatusBar } from 'react-native';
import { V } from '../../themes';

export default class StatusBar extends PureComponent {
  render() {
    return (
      <NativeStatusBar
        barStyle={V.appStatusBarStyle as any}
        backgroundColor={V.appStatusBarColor}
      />
    );
  }
}
