import { observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { BackHandler, Platform } from 'react-native';
import { NavigationContainerComponent } from 'react-navigation';
import i18nNext from '../i18n';
import { injectStores } from '../stores';
import showToast from '../utils/Toast';
import AppStack from './AppStack';
import { getCurrentRouteName, setNavigator } from './index';

@injectStores('ui')
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
    const { ui } = this.props;
    const currentScreen = getCurrentRouteName();

    if (ui.isLoadingVisible || this.isTransitioning) {
      // wait loading finished
      return true;
    }

    if (currentScreen !== 'AppTabBar') {
      // pop view
      return false;
    }

    if (this.lastBackPressed && this.lastBackPressed + 1000 >= Date.now()) {
      BackHandler.exitApp();
      return false;
    }

    this.lastBackPressed = Date.now();
    showToast(i18nNext.t('app_confirm_exit'));

    return true;
  };

  setNavigationRef = (nav: NavigationContainerComponent) => {
    setNavigator(nav);
  };

  render() {
    const { navigation } = this.props;

    return <AppStack ref={this.setNavigationRef} navigation={navigation} />;
  }
}
