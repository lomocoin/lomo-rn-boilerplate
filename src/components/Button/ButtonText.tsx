import React, { ReactNode, PureComponent } from 'react';
import { Text, StyleSheet } from 'react-native';
import { V } from '../../themes';
import { ButtonTypes } from './Button';

const styles = StyleSheet.create({
  text: {
    fontSize: V.btnFontSize,
    textAlign: 'center',
    marginTop: (V.btnHeight - V.btnFontSize) / 2,
    marginBottom: (V.btnHeight - V.btnFontSize) / 2,
  },
  miniText: {
    fontSize: V.btnMiniFontSize,
    marginTop: (V.btnMiniHeight * V.btnMiniFontSize - V.btnMiniFontSize) / 2,
    marginBottom: (V.btnMiniHeight * V.btnMiniFontSize - V.btnMiniFontSize) / 2,
  },
  defaultText: {
    color: V.defaultColor,
  },
  primaryText: {
    color: V.whiteColor,
  },
  dangerText: {
    color: V.whiteColor,
  },
  disabledText: {
    color: V.secondaryColor,
  },
});

const getTextStyles = (type: ButtonTypes, mini: boolean, disabled: boolean) => {
  const config = [];

  switch (type) {
    case ButtonTypes.primary:
      config.push(styles.primaryText);
      break;
    case ButtonTypes.danger:
      config.push(styles.dangerText);
      break;
    case ButtonTypes.default:
    default:
      config.push(styles.defaultText);
  }
  if (mini) {
    config.push(styles.miniText);
  }
  if (disabled) {
    config.push(styles.disabledText);
  }

  return config;
};

interface Props {
  type?: ButtonTypes;
  mini?: boolean;
  disabled?: boolean;
  children: ReactNode;
}

export default class ButtonText extends PureComponent<Props> {
  render() {
    const { type, mini, disabled, children } = this.props;

    const textStyles = getTextStyles(type!, mini!, disabled!);

    return <Text style={[styles.text, ...textStyles]}>{children}</Text>;
  }
}
