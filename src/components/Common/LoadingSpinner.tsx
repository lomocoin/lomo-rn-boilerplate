import React, { PureComponent } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { S, V } from '../../themes';

interface IProps {
  message?: string;
  spinnerColor?: string;
}

export default class LoadingSpinner extends PureComponent<IProps> {
  static defaultColor = {
    spinnerColor: V.defaultColor,
  };
  render() {
    const { message, spinnerColor } = this.props;

    return (
      <View style={[S.flex, S.flexAlignCenter, S.flexJustifyCenter]}>
        <ActivityIndicator color={spinnerColor} size="large" />
        {!!message && (
          <Text style={[S.textDefault, S.marginTop]}>{message}</Text>
        )}
      </View>
    );
  }
}
