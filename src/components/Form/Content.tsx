import React, { ComponentClass, PureComponent, ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import { S, V } from '../../themes';

const styles = StyleSheet.create({
  textContainer: {
    width: V.pgWidth * 0.2,
  },
  textStyle: {
    textAlign: V.start,
  },
  textInputContainer: {
    flex: 1,
  },
  textInputStyle: {
    padding: V.paddingBase,
    textAlign: V.end,
  },
});

interface Props {
  fullwidth?: boolean;
  children?: ReactNode;
  textStyle?: StyleProp<TextStyle>;
}

export default class FormCellContent extends PureComponent<Props> {
  static displayName = 'FormCellContent';
  static defaultProps = {
    access: false,
    fullwidth: false,
  };

  render() {
    const { fullwidth, children, textStyle } = this.props;

    let viewStyle;
    let content;

    content = React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        if (typeof child === 'string') {
          viewStyle = styles.textContainer;
          return (
            <Text style={[S.textDefault, styles.textStyle, textStyle]}>{child}</Text>
          );
        }
        return false;
      }

      const childType = child.type as ComponentClass<any>;

      if (childType.displayName === 'TextInput') {
        viewStyle = styles.textInputContainer;
        return React.cloneElement<any>(child, {
          style: [S.textDefault, styles.textInputStyle],
        });
      }

      return child;
    });

    return (
      <View style={[viewStyle, fullwidth ? { width: '100%', flex: 1 } : {}]}>
        {content}
      </View>
    );
  }
}
