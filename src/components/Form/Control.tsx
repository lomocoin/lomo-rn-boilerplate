import React, { Children, PureComponent, ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Props as CellProps } from './Cell';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
});

interface IProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default class FormControl extends PureComponent<IProps> {
  render() {
    const { children, style, ...others } = this.props;

    return (
      <View style={[styles.container, style]} {...others}>
        {Children.map(children, (child, index) =>
          React.isValidElement(child)
            ? React.cloneElement<CellProps>(child, { isFirstCell: index === 0 })
            : false,
        )}
      </View>
    );
  }
}
