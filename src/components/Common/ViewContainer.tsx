import React, { PureComponent, ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { S } from '../../themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface Props {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  keyboardAvoidingView?: boolean;
  onContainerClick?: () => void;
}

export default class ViewContainer extends PureComponent<Props> {
  render() {
    const {
      style,
      children,
      keyboardAvoidingView,
      onContainerClick,
    } = this.props;

    if (keyboardAvoidingView && Platform.OS === 'ios') {
      return (
        <KeyboardAvoidingView
          style={S.flex}
          behavior="padding"
          keyboardVerticalOffset={20}
        >
          <View style={[styles.container, style]}>{this.props.children}</View>
        </KeyboardAvoidingView>
      );
    }

    return (
      <View style={[styles.container, style]} onTouchEnd={onContainerClick}>
        {children}
      </View>
    );
  }
}
