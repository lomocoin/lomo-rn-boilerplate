import { observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Button, ButtonTypes } from '../../components/Button';
import {
  Badge,
  Header,
  ViewContainer,
  ViewContent,
} from '../../components/Common';
import { CellContent, FormCell, FormControl } from '../../components/Form';
import i18n from '../../i18n';
import { navigate } from '../../navigation';
import {
  IAuthStoreInjectedProps,
  injectStores,
  IUserStoreInjectedProps,
} from '../../stores';
import { S } from '../../themes';
import { checkCodePushUpdate, getAppVersion } from '../../utils/CodePush';
import showToast from '../../utils/Toast';

interface IProps extends IUserStoreInjectedProps, IAuthStoreInjectedProps {}

interface IState {
  codePushIsChecking: boolean;
  appVersion: string;
}

@injectStores('auth', 'user')
@observer
export default class Settings extends Component<IProps, IState> {
  clickCount: number = 0;
  codePushCurHash: string = '';
  state = {
    appVersion: DeviceInfo.getVersion(),
    codePushIsChecking: false,
  };

  componentDidMount() {
    getAppVersion().then(appVersion => {
      this.setState({ appVersion });
    });
  }

  checkForUpdates = () => {
    const { codePushIsChecking } = this.state;

    this.clickCount = this.clickCount + 1;

    if (this.clickCount > 10) {
      // TODO: if need, show debug info dialog
    }

    if (codePushIsChecking) {
      return;
    }

    this.setState({ codePushIsChecking: true });
    checkCodePushUpdate()
      .then(result => {
        this.setState({ codePushIsChecking: false });
        if (result.hasNewVersion) {
          this.installUpdates();
        } else {
          showToast(i18n.t('app_update_already_latest'));
        }
      })
      .catch(reason => {
        this.setState({ codePushIsChecking: false });
        showToast(reason);
      });
  };

  installUpdates = () => {
    this.setState({ codePushIsChecking: true });
  };

  doLogout = () => {
    const { auth } = this.props;
    auth.logout();
    navigate('Auth');
  };

  openPage = (routeName: string) => () => {
    navigate(routeName);
  };

  render() {
    const { codePushIsChecking, appVersion } = this.state;

    return (
      <ViewContainer>
        <Header title={i18n.t('settings_title')} />
        <ViewContent scrollable>
          <FormControl>
            <FormCell onPress={this.openPage('Privacy')}>
              <CellContent fullwidth>
                {i18n.t('settings_tab_privacy')}
              </CellContent>
            </FormCell>
            <FormCell onPress={this.openPage('Copyright')}>
              <CellContent fullwidth>
                {i18n.t('settings_tab_copyright')}
              </CellContent>
            </FormCell>
            <FormCell>
              <CellContent fullwidth>
                {i18n.t('settings_tab_contact_us')}
              </CellContent>
            </FormCell>
            <FormCell onPress={this.checkForUpdates}>
              <CellContent fullwidth>
                {i18n.t('settings_tab_appversion')}
              </CellContent>
              {codePushIsChecking ? <ActivityIndicator /> : false}
              <Text style={[S.textDefault, S.marginHorizontal5]}>
                {appVersion}
              </Text>
              <Badge value={1} showDot size={12} />
            </FormCell>
          </FormControl>
          <Button
            marginTop={50}
            type={ButtonTypes.danger}
            onPress={this.doLogout}
          >
            {i18n.t('settings_btn_signout')}
          </Button>
        </ViewContent>
      </ViewContainer>
    );
  }
}
