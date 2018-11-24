import React, { PureComponent, ReactNode } from 'react';
import {
  Image,
  ImagePropertiesSourceOptions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
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

interface IProps {
  scrollable?: boolean;
  bounces?: boolean;
  keyboardAvoidingView?: boolean;
  backgroundImage?: ImagePropertiesSourceOptions;
  children?: ReactNode;
  style?: ViewStyle;
}

export default class ViewContent extends PureComponent<IProps> {
  static defaultProps = {
    scrollable: false,
    bounces: false,
    keyboardAvoidingView: false,
    backgroundImage: null,
  };

  render() {
    const {
      scrollable,
      bounces,
      keyboardAvoidingView,
      backgroundImage,
      children,
      style,
    } = this.props;

    const composedStyles = [styles.container, style];

    let backgroundImageCmp;
    if (backgroundImage) {
      backgroundImageCmp = (
        <Image source={backgroundImage} style={styles.backgroundImage} />
      );
    }

    let contentCmp;
    if (scrollable) {
      contentCmp = (
        <ScrollView style={composedStyles} bounces={bounces}>
          {backgroundImageCmp}
          {children}
        </ScrollView>
      );
    } else {
      contentCmp = (
        <View style={composedStyles}>
          {backgroundImageCmp}
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
