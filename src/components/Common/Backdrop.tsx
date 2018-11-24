import React, { ReactNode } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { V } from '../../themes';

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: V.backdropBgColor,
  },
});

interface IProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onCancel?: () => void;
}

export default class Backdrop extends React.Component<IProps> {
  static defaultProps = {
    onCancel: () => null,
  };

  render() {
    const { style, onCancel, children, ...rest } = this.props;

    return (
      <TouchableWithoutFeedback onPress={onCancel}>
        <View {...rest} style={[styles.backdrop, style]}>
          {children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
