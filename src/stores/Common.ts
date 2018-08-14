import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';
import { Alert, Linking } from 'react-native';
import i18n from '../i18n';

export default class Common {
  // Welcome guide
  @persist
  @observable
  isWelcomeShown: boolean | undefined = undefined;

  // Loading modal
  @observable
  loadingMessage: string = '';
  @observable
  isLoadingVisible: boolean = false;
  @observable
  isLoadingBlocking: boolean = true;

  @action.bound
  showWelcome() {
    this.isWelcomeShown = true;
  }

  @action.bound
  hideWelcome() {
    this.isWelcomeShown = false;
  }

  @action.bound
  showLoading(message: string = '', isBlocking: boolean = true) {
    this.loadingMessage = message;
    this.isLoadingBlocking = isBlocking;
    this.isLoadingVisible = true;
  }

  @action.bound
  hideLoading() {
    this.isLoadingVisible = false;
  }

  openEmail(to: string, subject: string = '', body: string = '') {
    const url = `mailto:${to}?subject=${subject}&body=${body}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert(`${i18n.t('app_contact_us')}：${to}`);
        }
      })
      .catch(() => {
        Alert.alert(`${i18n.t('app_contact_us')}：${to}`);
      });
  }
}
