import { inject, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { interval, NEVER } from 'rxjs';
import { catchError, filter, skip, take, tap } from 'rxjs/operators';
import { Button } from '../components/Button';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ViewContainer from '../components/Common/ViewContainer';
import i18n from '../i18n';
import { AuthStoreInjectedProps, CommonStoreInjectedProps, hydrateStores, UserStoreInjectedProps } from '../stores';
import { ApiError } from '../utils/axios';
import showToast from '../utils/Toast';

const styles = StyleSheet.create({
  skipButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 120,
  },
  loadingIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

interface Props
  extends AuthStoreInjectedProps,
    CommonStoreInjectedProps,
    UserStoreInjectedProps,
    NavigationInjectedProps {}

interface State {
  countdown: number;
}

@inject('common', 'user', 'auth')
@observer
export default class Splash extends Component<Props, State> {
  showAdsCountdown: boolean;
  loadBackgroudCompleted: boolean;
  state = {
    countdown: 5,
  };

  constructor(props: Props) {
    super(props);

    this.showAdsCountdown = true;
    this.loadBackgroudCompleted = false;
  }

  componentWillMount() {
    this.initApp();
  }

  initApp = () => {
    this.loadWaitingAds();

    hydrateStores()
      .then(() => {
        this.loadDataInBackgroud();
      })
      .catch(() => {
        showToast(i18n.t('error_unknown'));
      });
  };

  loadWaitingAds = () => {
    const adsDuration = 5; // fix ad time of 5 seconds

    interval(__DEV__ ? 100 : 1000)
      .pipe(
        filter(() => this.showAdsCountdown),
        tap(() =>
          this.setState(prevState => ({
            countdown: prevState.countdown > 0 ? prevState.countdown - 1 : -1,
          })),
        ),
        skip(adsDuration - 1),
        filter(() => this.loadBackgroudCompleted),
        take(1),
        catchError(error => {
          showToast(error);
          return NEVER;
        }),
      )
      .subscribe(() => {
        this.goToAppOrAuth();
      });
  };

  loadDataInBackgroud = () => {
    const { auth, user } = this.props;

    auth
      .checkLogin()
      .then(() => user.getUser())
      .then(() => {
        this.loadBackgroudCompleted = true;
      })
      .catch((error: ApiError) => {
        switch (error.status) {
          case 401: // Token not valid
            this.loadBackgroudCompleted = true;
            break;
          case -1: // Network Error
          default:
            Alert.alert(
              '',
              i18n.t('splash_network_alert'),
              [
                {
                  text: i18n.t('splash_network_btn_retry'),
                  onPress: this.initApp,
                },
              ],
              {
                cancelable: false,
              },
            );
        }
      });
  };

  goToAppOrAuth = () => {
    const { auth, navigation } = this.props;
    navigation.navigate(auth.token ? 'App' : 'Auth');
  };

  render() {
    const { countdown } = this.state;

    return (
      <ViewContainer>
        <View style={styles.loadingIcon}>
          <LoadingSpinner />
        </View>
        <Button
          mini
          disabled={!this.loadBackgroudCompleted}
          style={styles.skipButton}
          onPress={this.goToAppOrAuth}
        >
          {countdown <= 0
            ? i18n.t('splash_btn_skip_slow')
            : `${i18n.t('splash_btn_skip_ad')} ${countdown}s`}
        </Button>
      </ViewContainer>
    );
  }
}
