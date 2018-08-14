import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import { V } from '../../themes';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: V.warnColor,
  },
  badgeText: {
    textAlign: 'center',
    fontSize: 11,
    color: V.whiteColor,
  },
});

interface Props {
  size?: number;
  showDot?: boolean;
  value: number;
  style?: StyleProp<ViewStyle>;
}

export default class Badge extends PureComponent<Props> {
  static displayName = 'Badge';
  static defaultProps = {
    size: 20,
    showDot: false,
  };

  render() {
    const { value, showDot, size, style } = this.props;

    if (!value || value <= 0) {
      return false;
    }

    const badgeStyles = {
      width: size,
      height: size,
      borderRadius: size / 2,
    };

    const badgeValue = value > 99 ? '...' : value;
    const badgeText = showDot ? '' : badgeValue;

    return (
      <View style={[styles.container, badgeStyles, style]}>
        <Text style={styles.badgeText}>{badgeText}</Text>
      </View>
    );
  }
}
