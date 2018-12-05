import React, { PureComponent } from 'react';
import { V } from '../../themes';
import Backdrop from './Backdrop';
import LoadingSpinner from './LoadingSpinner';

interface IProps {
  isShow: boolean;
  message?: string;
}

export default class LoadingView extends PureComponent<IProps> {
  render() {
    const { isShow, message } = this.props;

    if (!isShow) {
      return false;
    }

    const loadingIcon = (
      <LoadingSpinner message={message} spinnerColor={V.whiteColor} />
    );

    return <Backdrop>{loadingIcon}</Backdrop>;
  }
}
