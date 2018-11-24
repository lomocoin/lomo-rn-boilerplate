import React, { PureComponent } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { V } from '../../themes';
import { ButtonTypes } from './ButtonTypes';

const styles = StyleSheet.create({
  text: {
    fontSize: V.btnFontSize,
    lineHeight: V.btnFontSize + 2,
    textAlign: 'center',
  },
  textMini: {
    fontSize: V.btnFontSizeMini,
    lineHeight: V.btnFontSizeMini + 2,
  },
  textFlat: {
    fontSize: V.defaultFontSize,
  },
});

const getTextColor = (type?: ButtonTypes, isDisabled?: boolean) => {
  if (isDisabled) {
    return V.secondaryColor;
  }
  switch (type) {
    case ButtonTypes.primary:
      return V.whiteColor;
    case ButtonTypes.danger:
      return V.whiteColor;
    case ButtonTypes.success:
      return V.whiteColor;
    case ButtonTypes.transparent:
      return V.whiteColor;
    case ButtonTypes.default:
      return V.whiteColor;
    default:
      return V.primaryColor;
  }
};

interface IProps {
  type?: ButtonTypes;
  mini?: boolean;
  flat?: boolean;
  disabled?: boolean;
  children: string;
  textStyle?: StyleProp<TextStyle>;
}

export default class ButtonText extends PureComponent<IProps> {
  render() {
    const { type, mini, flat, disabled, textStyle, children } = this.props;

    const color = getTextColor(type, disabled);

    return (
      <Text
        style={[
          styles.text,
          { color },
          flat ? styles.textFlat : false,
          mini ? styles.textMini : false,
          textStyle,
        ]}
        numberOfLines={1}
      >
        {children}
      </Text>
    );
  }
}
