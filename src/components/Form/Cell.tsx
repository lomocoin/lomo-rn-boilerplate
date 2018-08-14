import React, { ComponentClass, PureComponent, ReactNode } from 'react';
import { StyleProp, StyleSheet, TouchableHighlight, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { S, V } from '../../themes';

const styles = StyleSheet.create({
  cell: {
    flexDirection: V.isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    minHeight: V.fromCellMinHeight,
    paddingHorizontal: V.paddingBase,
    backgroundColor: V.defaultBgColor,
  },
  columnCell: {
    flexDirection: 'column',
  },
  firstCell: {
    borderTopWidth: 0,
  },
  imageContainer: {
    marginRight: V.paddingBase,
  },
  imageStyle: {
    width: V.fromCellMinHeight / 3,
    height: V.fromCellMinHeight / 3,
    resizeMode: 'contain',
  },
  accessContainer: {
    paddingLeft: V.paddingBase,
    alignItems: V.flexEnd,
  },
});

export interface Props {
  isFirstCell?: boolean; // set by parent Controll component
  isColumn?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default class FormCell extends PureComponent<Props> {
  static defaultProps = {
    isColumn: false,
  };

  render() {
    const {
      isFirstCell,
      isColumn,
      children,
      onPress,
      onLongPress,
    } = this.props;

    let mainContent;
    let extraContent;

    mainContent = React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return false;
      }

      const childType = child.type as ComponentClass<any>;

      if (childType.displayName === 'Image') {
        return (
          <View style={styles.imageContainer}>
            {React.cloneElement<any>(child, { style: styles.imageStyle })}
          </View>
        );
      }

      return child;
    });

    if (onPress) {
      extraContent = (
        <View style={styles.accessContainer}>
          <Icon
            name="chevron-thin-right"
            size={V.titleFontSize}
            color={V.secondaryColor}
          />
        </View>
      );
    }

    return (
      <TouchableHighlight
        onPress={onPress}
        onLongPress={onLongPress}
        underlayColor={V.secondaryBgColor}
      >
        <View
          style={[
            S.borderTop,
            styles.cell,
            isFirstCell ? styles.firstCell : null,
            isColumn ? styles.columnCell : null,
          ]}
        >
          {V.isRTL ? extraContent : false}
          {mainContent}
          {V.isRTL ? false : extraContent}
        </View>
      </TouchableHighlight>
    );
  }
}
