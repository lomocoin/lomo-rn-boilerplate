import React, { PureComponent, ReactNode } from 'react';
import { Image, ImagePropertiesSourceOptions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { V } from '../../themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: V.secondaryBgColor,
  },
  backgroundImage: {
    position: 'absolute',
    resizeMode: 'cover',
    top: 0,
    height: '100%',
    width: '100%',
  },
});

interface Props {
  scrollable?: boolean;
  bounces?: boolean;
  keyboardAvoidingView?: boolean;
  backgroudImage?: ImagePropertiesSourceOptions;
  children?: ReactNode;
  style?: ViewStyle;
}

export function withKeyboardAvoidingView(Comp: any) {
  return (props: any) => (
    <KeyboardAvoidingView behavior="padding">
      <Comp {...props} />
    </KeyboardAvoidingView>
  );
}

export default class ViewContent extends PureComponent<Props> {
  static defaultProps = {
    scrollable: false,
    bounces: false,
    keyboardAvoidingView: false,
    backgroudImage: null,
  };

  render() {
    const {
      scrollable,
      bounces,
      keyboardAvoidingView,
      backgroudImage,
      children,
      style,
    } = this.props;

    const composedStyles = [styles.container, style];

    let backgroudImageCmp;
    if (backgroudImage) {
      backgroudImageCmp = (
        <Image source={backgroudImage} style={styles.backgroundImage} />
      );
    }

    let contentCmp;
    if (scrollable) {
      contentCmp = (
        <ScrollView style={composedStyles} bounces={bounces}>
          {backgroudImageCmp}
          {children}
        </ScrollView>
      );
    } else {
      contentCmp = (
        <View style={composedStyles}>
          {backgroudImageCmp}
          {children}
        </View>
      );
    }

    if (keyboardAvoidingView && Platform.OS === 'ios') {
      return (
        <KeyboardAvoidingView style={composedStyles} behavior="padding">
          {contentCmp}
        </KeyboardAvoidingView>
      );
    }

    return contentCmp;
  }
}
