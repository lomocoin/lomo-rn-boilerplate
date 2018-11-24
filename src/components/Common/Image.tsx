import React, { PureComponent } from 'react';
import { Image, ImageResizeMode, ImageStyle, StyleProp } from 'react-native';

interface IProps {
  size?: number;
  width?: number | string;
  height?: number;
  resizeMode?: ImageResizeMode;
  style?: StyleProp<ImageStyle>;
  source: any;
}

export default class ImageWrapper extends PureComponent<IProps> {
  static displayName = 'Image';
  static defaultProps = {
    size: 50,
    width: 50,
    height: 50,
    resizeMode: 'contain',
    source: null,
  };

  render() {
    const {
      width,
      height,
      resizeMode,
      style,
      source,
      size,
      ...others
    } = this.props;

    const imageStyle = {
      width,
      height,
    };

    if (size && size > 0) {
      imageStyle.width = size;
      imageStyle.height = size;
    }

    return (
      <Image
        style={[imageStyle, style]}
        resizeMode={resizeMode}
        source={source}
        {...others}
      />
    );
  }
}
