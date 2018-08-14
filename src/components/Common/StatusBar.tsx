import React, { Fragment, PureComponent } from 'react';
import { Platform, StatusBar as NativeStatusBar, StyleSheet, View } from 'react-native';
import { V } from '../../themes';

const styles = StyleSheet.create({
  iOSStatusBar: {
    height: 20,
    backgroundColor: V.appStatusBarColor,
  },
});

export default class StatusBar extends PureComponent {
  render() {
    const majorVersion = V.deviceOSVersion.split('.');
    const hasFakeStatusbar =
      Platform.OS === 'ios' &&
      majorVersion.length > 0 &&
      Number(majorVersion[0]) < 11;

    return (
      <Fragment>
        {hasFakeStatusbar && <View style={styles.iOSStatusBar} />}
        <NativeStatusBar
          barStyle="dark-content"
          backgroundColor={V.appStatusBarColor}
          animated
        />
      </Fragment>
    );
  }
}
