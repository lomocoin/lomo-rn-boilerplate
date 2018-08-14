import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import { S, IMAGES } from '../../themes';
import Image from '../Common/Image';

interface Props {
  message?: string;
}

export default class LoadingSpinner extends PureComponent<Props> {
  render() {
    const { message } = this.props;

    return (
      <View style={[S.flex, S.flexAlignCenter, S.flexJustifyCenter]}>
        <Image source={IMAGES.icon_loading} size={100} />
        {!!message && (
          <Text style={[S.textDefault, S.colorWhite, S.marginTop]}>
            {message}
          </Text>
        )}
      </View>
    );
  }
}
