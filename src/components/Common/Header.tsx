import React, { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { goBack } from '../../navigation';
import { Icon, S, V } from '../../themes';
import Image from './Image';

const styles = StyleSheet.create({
  container: {
    height: V.headerHeight,
    width: V.pgWidth,
    paddingTop: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: V.borderColor,
    borderBottomWidth: V.borderWidth,
    backgroundColor: V.defaultBgColor,
  },
  headerTitle: {
    justifyContent: 'center',
    maxWidth: 200,
    fontSize: V.headerFontSize,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: V.headerColor,
  },
  headerLeft: {
    left: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    justifyContent: 'center',
  },
  headerRight: {
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    justifyContent: 'center',
  },
});

interface Props {
  title: string;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
  headerRightText?: string;
  headerRightIcon?: ReactNode;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  hideBackButton?: boolean;
}
export default class Header extends React.PureComponent<Props> {
  static defaultProps = {
    headerBackTitle: '',
    hideBackButton: false,
  };

  doGoBack = () => {
    const { onLeftClick } = this.props;
    if (onLeftClick) {
      onLeftClick();
    } else {
      goBack();
    }
  };

  headerLeft = () => {
    const { hideBackButton } = this.props;

    if (hideBackButton) {
      return false;
    }

    return (
      <TouchableOpacity
        style={[S.flex, S.paddingHorizontal, S.flexJustifyCenter]}
        onPress={this.doGoBack}
      >
        <Icon name="back" size={30} color={V.headerColor} />
      </TouchableOpacity>
    );
  };

  headerRight = () => {
    const { headerRightIcon, headerRightText, onRightClick } = this.props;

    let headerRight;

    if (headerRightIcon) {
      headerRight = <Image source={headerRightIcon} size={18} />;
    }
    if (headerRightText) {
      headerRight = <Text>{headerRightText}</Text>;
    }

    if (headerRight) {
      headerRight = (
        <TouchableOpacity
          style={[S.flex, S.paddingHorizontal, S.flexJustifyCenter]}
          onPress={onRightClick}
        >
          {headerRight}
        </TouchableOpacity>
      );
    }

    return headerRight;
  };

  render() {
    const { title, headerLeft, headerRight } = this.props;

    return (
      <View style={styles.container}>
        <Text numberOfLines={1} style={styles.headerTitle}>
          {title}
        </Text>
        <View style={styles.headerLeft}>{headerLeft || this.headerLeft()}</View>
        <View style={styles.headerRight}>
          {headerRight || this.headerRight()}
        </View>
      </View>
    );
  }
}
