import React, { PureComponent, ReactNode } from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { V } from '../../themes';
import ButtonText from './ButtonText';
import { ButtonTypes } from './ButtonTypes';
import TouchableButton from './TouchableButton';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
    height: V.btnHeight,
    paddingHorizontal: V.paddingBase,
    borderWidth: 0,
  },
  buttonFlat: {
    height: 'auto',
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  buttonRaisedIOS: {
    shadowColor: 'rgba(56, 58, 69, 1)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 1,
  },
  buttonRaisedAndroid: {
    elevation: 4,
  },
});

const getBackgroundColor = (type?: ButtonTypes, isDisabled?: boolean) => {
  if (isDisabled) {
    return V.secondaryColor;
  }
  switch (type) {
    case ButtonTypes.primary:
      return V.primaryColor;
    case ButtonTypes.danger:
      return V.warningColor;
    case ButtonTypes.success:
      return V.successColor;
    case ButtonTypes.default:
    default:
      return V.defaultBgColor;
  }
};

export interface IButtonProps {
  type?: ButtonTypes;
  disabled?: boolean;
  mini?: boolean;
  raised?: boolean;
  flat?: boolean;
  /**
   * Apply to the button a width equal to 100%
   */
  fullwidth: boolean;
  autoWidth: boolean;
  marginTop?: number;
  borderRadius: number;
  borderColor?: string;
  isHighlight?: boolean; // 是否用TouchableHighlight组件
  children: string | ReactNode;
  cmpLeft?: ReactNode;
  cmpRight?: ReactNode;
  style?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  testID?: string;
  onPress: () => void;
}

export class Button extends PureComponent<IButtonProps> {
  static displayName = 'Button';
  static defaultProps = {
    type: ButtonTypes.default,
    disabled: false,
    mini: false,
    raised: false,
    flat: false,
    fullwidth: false,
    autoWidth: false,
    marginTop: 0,
    borderRadius: undefined,
    borderColor: undefined,
    isHighlight: false,
    onPress: () => null,
  };

  handlePress = () => {
    const { onPress } = this.props;
    onPress();
  };

  render() {
    const {
      type,
      mini,
      raised,
      flat,
      disabled,
      fullwidth,
      autoWidth,
      marginTop,
      borderRadius: customBorderRadius,
      borderColor,
      isHighlight,
      style,
      buttonStyle,
      textStyle,
      cmpLeft,
      cmpRight,
      children,
      testID,
    } = this.props;

    // const extras: TouchableHighlightProperties = {};
    const extras: any = {};
    const backgroundColor = getBackgroundColor(type, disabled);
    const borderRadius = isFinite(customBorderRadius)
      ? customBorderRadius
      : V.btnBorderRadius;

    if (isHighlight) {
      extras.underlayColor = backgroundColor;
    }

    return (
      <View
        style={[
          { marginTop },
          raised && Platform.OS === 'ios' ? styles.buttonRaisedIOS : false,
          { borderRadius },
          style,
        ]}
      >
        <TouchableButton
          testID={testID}
          disabled={disabled}
          onPress={this.handlePress}
        >
          <View
            style={[
              styles.button,
              raised && Platform.OS === 'android'
                ? styles.buttonRaisedAndroid
                : false,
              { backgroundColor },
              { borderRadius },
              flat ? styles.buttonFlat : false,
              !flat && !autoWidth ? { width: V.btnWidth } : false,
              fullwidth ? { width: '100%' } : false,
              borderColor
                ? { borderColor, borderWidth: V.btnBorderWidth }
                : false,
              buttonStyle,
            ]}
          >
            {cmpLeft}
            {typeof children !== 'string' ? (
              children
            ) : (
              <ButtonText
                {...{
                  type,
                  mini,
                  flat,
                  disabled,
                  textStyle,
                }}
              >
                {children}
              </ButtonText>
            )}
            {cmpRight}
          </View>
        </TouchableButton>
      </View>
    );
  }
}
