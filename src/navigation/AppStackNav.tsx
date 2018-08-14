import React, { Component } from 'react';
import { BackHandler, Platform } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import { setNavigator, getCurrentRouteName } from './index';
import showToast from '../utils/Toast';
import AppStack from './AppStack';

@inject('common')
@observer
export default class AppStackNav extends Component<any> {
  static router = AppStack.router;
  isTransitioning: boolean = false;
  lastBackPressed: number = 0;

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  onBackAndroid = () => {
    const { common } = this.props;
    const currentScreen = getCurrentRouteName();

    if (common.isLoadingVisible || this.isTransitioning) {
      // wait loading finished
      return true;
    }

    if (currentScreen !== 'AppTabbar') {
      // pop view
      return false;
    }

    if (this.lastBackPressed && this.lastBackPressed + 1000 >= Date.now()) {
      BackHandler.exitApp();
      return false;
    }

    this.lastBackPressed = Date.now();
    showToast(common.lg.t('app_confirm_exit'));

    return true;
  };

  setNavigationRef = (nav: any) => {
    setNavigator(nav);
  };

  render() {
    const { navigation } = this.props;

    return <AppStack ref={this.setNavigationRef} navigation={navigation} />;
  }
}
