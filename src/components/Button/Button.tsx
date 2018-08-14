import React, { PureComponent } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Platform,
  TouchableHighlightProperties,
} from 'react-native';
import ButtonText from './ButtonText';
import { V } from '../../themes';

export enum ButtonTypes {
  primary = 'primary',
  danger = 'danger',
  default = 'default',
}

const getButtonStyles = (
  type: ButtonTypes,
  mini: boolean,
  disabled: boolean,
) => {
  const config = [];

  switch (type) {
    case ButtonTypes.primary:
      config.push(styles.primary);
      break;
    case ButtonTypes.danger:
      config.push(styles.danger);
      break;
    case ButtonTypes.default:
    default:
      config.push(styles.default);
  }

  if (mini) {
    config.push(styles.mini);
  }

  if (disabled) {
    config.push(styles.disabled);
  }

  return config;
};

const getUnderlayColor = (type: ButtonTypes) => {
  switch (type) {
    case ButtonTypes.primary:
      return V.primaryColor;
    case ButtonTypes.danger:
      return V.warnColor;
    case ButtonTypes.default:
    default:
      return V.defaultBgColor;
  }
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: V.btnBorderRadius,
    alignSelf: 'center',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'hidden',
    alignItems: 'center',
    borderRadius: V.btnBorderRadius,
    borderWidth: V.borderWidth,
    paddingLeft: V.gap15,
    paddingRight: V.gap15,
    borderColor: V.borderColor,
    maxWidth: V.btnMaxWidth,
  },
  default: {
    backgroundColor: V.defaultBgColor,
  },
  primary: {
    backgroundColor: V.primaryColor,
  },
  danger: {
    backgroundColor: V.warnColor,
  },
  disabled: {
    borderColor: V.secondaryBgColor,
  },
  mini: {
    paddingLeft: V.gap10,
    paddingRight: V.gap10,
  },
});

interface Props {
  type?: ButtonTypes;
  disabled?: boolean;
  mini?: boolean;
  marginTop?: number;
  borderRadius?: number;
  children: string;
  style?: any;
  onPress: () => void;
  isHighlight?: boolean; // 是否用TouchableHighlight组件
}

export class Button extends PureComponent<Props> {
  static defaultProps = {
    type: ButtonTypes.default,
    disabled: false,
    mini: false,
    marginTop: 0,
    borderRadius: V.btnBorderRadius,
    onPress: () => null,
    isHighlight: false,
  };

  handlePress = () => {
    const { onPress } = this.props;
    onPress();
  };

  render() {
    const {
      type,
      disabled,
      mini,
      marginTop,
      borderRadius,
      style,
      children,
      isHighlight,
    } = this.props;
    const buttonStyles = getButtonStyles(type!, mini!, disabled!);
    const TouchableButton =
      Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const extras: TouchableHighlightProperties = {};

    if (isHighlight) {
      extras.underlayColor = getUnderlayColor(type!);
    }

    return (
      <View
        style={[
          styles.touchable,
          style,
          { borderRadius },
          { marginTop },
        ]}
      >
        <TouchableButton
          {...extras}
          disabled={disabled}
          onPress={this.handlePress}
        >
          <View
            style={[
              styles.button,
              { borderRadius },
              { minWidth: mini ? V.btnMiniMinWidth : V.btnMinWidth },
              ...buttonStyles,
            ]}
          >
            <ButtonText {...this.props}>{children}</ButtonText>
          </View>
        </TouchableButton>
      </View>
    );
  }
}
