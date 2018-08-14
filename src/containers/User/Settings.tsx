import { inject, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { ActivityIndicator, Alert, Text } from 'react-native';
import codePush from 'react-native-code-push';
import DeviceInfo from 'react-native-device-info';
import { Button, ButtonTypes } from '../../components/Button';
import Badge from '../../components/Common/Badge';
import Header from '../../components/Common/Header';
import ViewContainer from '../../components/Common/ViewContainer';
import ViewContent from '../../components/Common/ViewContent';
import { CellContent, FormCell, FormControl } from '../../components/Form';
import i18n from '../../i18n';
import { navigate } from '../../navigation';
import { AuthStoreInjectedProps, CommonStoreInjectedProps, UserStoreInjectedProps } from '../../stores';
import { S } from '../../themes';
import showToast from '../../utils/Toast';

interface Props
  extends UserStoreInjectedProps,
    AuthStoreInjectedProps,
    CommonStoreInjectedProps {}

interface State {
  codePushIsChecking: boolean;
}

@inject('common', 'auth', 'user')
@observer
export default class Settings extends Component<Props, State> {
  clickCount: number = 0;
  codePushCurHash: string = '';
  codePushCurVer: string = '';
  state = {
    codePushIsChecking: false,
  };

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    codePush.getUpdateMetadata(codePush.UpdateState.RUNNING).then(data => {
      this.codePushCurHash = data ? data.packageHash : '';
      this.codePushCurVer = data ? `-${data.label}` : '';
      this.forceUpdate(); // force re-render
    });
  }

  checkForUpdates = () => {
    const { codePushIsChecking } = this.state;

    this.clickCount = this.clickCount + 1;

    if (codePushIsChecking) {
      return;
    }

    this.setState({ codePushIsChecking: true });

    codePush
      .checkForUpdate()
      .then(data => {
        if (data && data.packageHash !== this.codePushCurHash) {
          const buttons = [
            {
              text: i18n.t('cancel'),
            },
            {
              text: i18n.t('update_now'),
              onPress: this.installUpdates,
            },
          ];
          Alert.alert(
            i18n.t('update_app_title'),
            i18n.t('update_app_restart_app'),
            buttons,
          );
          this.setState({ codePushIsChecking: false });
        } else {
          this.setState({ codePushIsChecking: false });
          showToast(i18n.t('app_update_already_latest'));
        }
      })
      .catch(reason => {
        this.setState({ codePushIsChecking: false });
        return Promise.resolve(reason) as any;
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

  openContactUs = () => {
    const { common } = this.props;
    common.openEmail('test@test.com');
  };

  render() {
    const { codePushIsChecking } = this.state;
    const version = DeviceInfo.getVersion();

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
            <FormCell onPress={this.openContactUs}>
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
                {version}
                {this.codePushCurVer}
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
