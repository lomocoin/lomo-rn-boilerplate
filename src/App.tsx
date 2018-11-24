import AppCenter from 'appcenter';
import Analytics from 'appcenter-analytics';
import Crashes, { ErrorAttachmentLog } from 'appcenter-crashes';
import { observer, Provider } from 'mobx-react/native';
import React, { Component } from 'react';
import { setI18n } from 'react-i18next';
import { Platform, YellowBox } from 'react-native';
import CodePush from 'react-native-code-push';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-navigation';
import Loading from './components/Common/Loading';
import StatusBar from './components/Common/StatusBar';
import i18n from './i18n';
import AppNavigator from './navigation/AppNavigator';
import { IStore, Store } from './stores';
import { S } from './themes';
import { setAuthInfo } from './utils/axios';
import { codePushConfig } from './utils/CodePush';

YellowBox.ignoreWarnings([]);

interface IState {
  store: IStore | null;
}

@CodePush(codePushConfig())
@observer
export default class App extends Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      store: null,
    };
  }

  async componentDidMount() {
    AppCenter.setLogLevel(
      __DEV__ ? AppCenter.LogLevelDebug : AppCenter.LogLevelNone,
    );
    Crashes.setEnabled(!__DEV__);
    Analytics.setEnabled(!__DEV__);

    const store: any = await Store.hydrate();

    Crashes.setListener({
      shouldProcess: () => true, // return false if the crash report need to be ignored
      getErrorAttachments() {
        const textAttachment = ErrorAttachmentLog.attachmentWithText(
          'UserId',
          `${store.user.id || 'before_login'}`,
        );
        return Promise.resolve([textAttachment]);
      },
    });

    setI18n(i18n);
    setAuthInfo(store.auth.token, store.auth.logout);
    i18n.changeLanguage(store.ui.language);

    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }

    this.setState({
      store,
    });
  }

  render() {
    const { store } = this.state;

    return (
      store && (
        <Provider store={store}>
          <SafeAreaView
            forceInset={{ bottom: 'never' }}
            style={[S.flex, S.bgDefault]}
          >
            <StatusBar />
            <AppNavigator />
            <Loading isShow={store.ui.isLoading} />
          </SafeAreaView>
        </Provider>
      )
    );
  }
}
