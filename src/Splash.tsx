import { observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CodePush from 'react-native-code-push';
import { NavigationInjectedProps } from 'react-navigation';
import { Image, ViewContainer } from './components/Common';
import ProgressBar from './components/Common/ProgressBar';
import i18n from './i18n';
import { IAuthStoreInjectedProps, IUserStoreInjectedProps } from './stores';
import injectStores from './stores/injectStores';
import { IMAGES, S } from './themes';
import Analytics, { ModulesNames } from './utils/Analytics';
import { checkCodePushUpdate } from './utils/CodePush';

const styles = StyleSheet.create({
  loadingIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingBar: {
    position: 'absolute',
    marginHorizontal: '20%',
    width: '60%',
    bottom: '7%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface IProps
  extends NavigationInjectedProps,
    IAuthStoreInjectedProps,
    IUserStoreInjectedProps {}

interface IState {
  loadingProgress: number;
  loadingMessage: string;
}

@injectStores('auth', 'user')
@observer
export default class Splash extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loadingProgress: 0,
      loadingMessage: '',
    };
  }

  componentWillMount() {
    this.initApp();
  }

  initApp = () => {
    this.loadDataInBackground()
      .then(() => {
        this.goToAppOrAuth();
      })
      .catch(error => {
        const message = error && error.message ? error.message : '';
        alert(message);
      });
  };

  goToAppOrAuth = () => {
    const { navigation, auth } = this.props;
    return navigation.navigate(auth.isAuthorized ? 'App' : 'Auth');
  };

  setDownloadProgress = (loadingProgress: number) => {
    this.setState({
      loadingProgress,
      loadingMessage: i18n.t('splash_progress_download_app'),
    });
  };

  setStepProgress = (step: number, translationKey?: string) => {
    this.setState({
      loadingProgress: step,
      loadingMessage: translationKey
        ? i18n.t(translationKey)
        : this.state.loadingMessage,
    });
  };

  async loadDataInBackground() {
    const { user } = this.props;
    this.setStepProgress(25, 'splash_progress_check_update');
    let updateRes = { isUpdated: false };
    try {
      updateRes = await checkCodePushUpdate(true, this.setDownloadProgress);
    } catch (error) {
      Analytics.logError(
        ModulesNames.App,
        'Splash',
        'checkCodePushUpdate',
        error,
      );
    }
    if (updateRes.isUpdated) {
      this.setStepProgress(100);
      CodePush.restartApp();
      return false;
    }

    this.setStepProgress(50, 'splash_progress_load_data');

    try {
      this.setStepProgress(80, 'splash_progress_load_user');
      await user.getUser();
    } catch {
      // let axios reactOnStatus show a Dialog
    }
    return true;
  }

  render() {
    const { loadingMessage, loadingProgress } = this.state;

    return (
      <ViewContainer>
        <View style={styles.loadingIcon}>
          <Image source={IMAGES.icon_loading} width="30%" />
        </View>
        <View style={styles.loadingBar}>
          <ProgressBar value={loadingProgress} />
          <Text style={[S.textSecondary, S.marginTop10, S.colorWhite]}>
            {loadingMessage}
          </Text>
        </View>
      </ViewContainer>
    );
  }
}
