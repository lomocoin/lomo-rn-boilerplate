import React, { PureComponent } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { S, V } from '../../themes';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    minWidth: 40,
  },
  progressBarView: {
    flex: 1,
    borderRadius: V.progressBarRadius,
    borderWidth: V.progressBarBorderWidth,
    borderColor: V.progressBarBorderColor,
  },
  progressBarValue: {
    flex: 1,
    borderRadius: V.progressBarRadius,
    maxWidth: '100%',
  },
  percentageText: {
    minWidth: 50,
    textAlign: 'right',
  },
});

interface IProps {
  label?: string;
  value: number;
  height?: number;
  maxValue: number;
  showPercentage: boolean;
  style?: StyleProp<ViewStyle>;
  colorBarBg?: string;
  colorBarValue?: string;
  onClick?: () => void;
}

export default class ProgressBar extends PureComponent<IProps> {
  static defaultProps = {
    maxValue: 100,
    height: V.progressBarSize,
    showPercentage: false,
    colorBarBg: V.progressBarBgColor,
    colorBarValue: V.progressBarFgColor,
  };

  render() {
    const {
      style,
      label,
      value,
      height,
      maxValue,
      showPercentage,
      colorBarBg,
      colorBarValue,
      children,
    } = this.props;

    const ratio = value / maxValue;
    const percentage = ratio * 100;
    const percentageText = `${(Math.round(percentage * 100) / 100).toFixed(
      2,
    )}%`;

    return (
      <View style={[styles.container, style]}>
        {!!label && (
          <Text style={[S.textDefault, S.colorSecondary, styles.labelText]}>
            {label}
          </Text>
        )}
        <View
          style={[
            styles.progressBarView,
            {
              backgroundColor: colorBarBg,
              height,
              marginLeft: !!label ? V.gap5 : 0,
            },
          ]}
        >
          <View
            style={[
              styles.progressBarValue,
              { width: percentageText, backgroundColor: colorBarValue },
            ]}
          />
        </View>
        {showPercentage && (
          <Text
            style={[S.textDefault, S.colorSecondary, styles.percentageText]}
          >
            {percentageText}
          </Text>
        )}
        {children}
      </View>
    );
  }
}
