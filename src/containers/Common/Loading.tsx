import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import { V } from '../../themes';

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: V.pgWidth,
    height: V.pgHeight,
    position: 'absolute',
    zIndex: 1000,
  },
  noBlocking: {
    position: 'absolute',
    top: '45%',
    width: '100%',
    justifyContent: 'center',
  },
  loadingView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loadingImage: {
    width: 80,
    height: 80,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 14,
    color: V.whiteColor,
  },
});

interface Props {
  isShow: boolean;
  isBlocking: boolean;
  message?: string;
}

export default class LoadingView extends PureComponent<Props> {
  render() {
    const { isShow, isBlocking, message } = this.props;

    if (!isShow) {
      return false;
    }

    const loadingIcon = <LoadingSpinner message={message} />;

    if (!isBlocking) {
      return <View style={styles.noBlocking}>{loadingIcon}</View>;
    }

    return <View style={styles.overlay}>{loadingIcon}</View>;
  }
}
