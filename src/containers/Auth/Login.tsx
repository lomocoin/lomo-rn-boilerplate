import { observer } from 'mobx-react/native';
import React, { Component } from 'react';
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, ButtonTypes } from '../../components/Button';
import { Header, ViewContainer, ViewContent } from '../../components/Common';
import { CellContent, FormCell, FormControl } from '../../components/Form';
import i18n from '../../i18n';
import { navigate } from '../../navigation';
import {
  IAuthStoreInjectedProps,
  injectStores,
  IUiStoreInjectedProps,
  IUserStoreInjectedProps,
} from '../../stores';
import { Icon, S } from '../../themes';
import showToast from '../../utils/Toast';

interface IProps
  extends IUserStoreInjectedProps,
    IAuthStoreInjectedProps,
    IUiStoreInjectedProps {}

interface IState {
  showPassword: boolean;
  username: string;
  password: string;
}

@injectStores('user', 'auth', 'ui')
@observer
export default class Login extends Component<IProps, IState> {
  state = {
    showPassword: true,
    username: '',
    password: '',
  };

  openForgotPassword = () => {
    navigate('ForgotPassword');
  };

  doLogin = () => {
    const { auth, user, ui } = this.props;
    const { username, password } = this.state;

    if (!username || username.length === 0) {
      showToast(i18n.t('login_need_username'));
      return;
    }

    if (!password || password.length === 0) {
      showToast(i18n.t('login_need_password'));
      return;
    }

    Keyboard.dismiss();
    ui.showLoading();

    const params = {
      username,
      password,
    };

    auth
      .login(params)
      .then(() => user.getUser())
      .then(() => {
        ui.hideLoading();
        navigate('App');
      })
      .catch(error => {
        ui.hideLoading();
        showToast(error.message);
      });
  };

  setPassword = (text: string) => {
    this.setState({
      password: text,
    });
  };

  setUsername = (text: string) => {
    this.setState({
      username: text,
    });
  };

  toggleShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  toggleRegister = () => {
    navigate('Register');
  };

  render() {
    const { showPassword } = this.state;

    return (
      <ViewContainer>
        <Header title={i18n.t('login_title')} hideBackButton />
        <ViewContent scrollable>
          <FormControl>
            <FormCell>
              <CellContent>{i18n.t('login_label_username')}</CellContent>
              <CellContent>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder={i18n.t('login_placeholder_username')}
                  onChangeText={this.setUsername}
                />
              </CellContent>
            </FormCell>
            <FormCell>
              <CellContent>{i18n.t('login_label_password')}</CellContent>
              <CellContent>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={showPassword}
                  placeholder={i18n.t('login_placeholder_password')}
                  onChangeText={this.setPassword}
                />
              </CellContent>
              <CellContent>
                <TouchableOpacity onPress={this.toggleShowPassword}>
                  <Icon
                    name={showPassword ? 'eye-close' : 'eye-open'}
                    size={15}
                  />
                </TouchableOpacity>
              </CellContent>
            </FormCell>
          </FormControl>
          <View style={S.padding}>
            <View style={S.flexRow}>
              <Text style={S.textDefaultLight}>
                {i18n.t('login_label_forgot_password')}
              </Text>
              <Text
                style={[S.textDefaultLight, S.textUnderline, S.marginLeft5]}
                onPress={this.openForgotPassword}
              >
                {i18n.t('login_btn_forgot_password')}
              </Text>
            </View>
            <View style={[S.flexRow, S.paddingTop10]}>
              <Text style={S.textDefaultLight}>
                {i18n.t('login_label_signup')}
              </Text>
              <Text
                style={[S.textDefaultLight, S.textUnderline, S.marginLeft5]}
                onPress={this.toggleRegister}
              >
                {i18n.t('login_btn_signup')}
              </Text>
            </View>
          </View>
          <Button
            marginTop={30}
            type={ButtonTypes.primary}
            onPress={this.doLogin}
          >
            {i18n.t('login_btn_signin')}
          </Button>
        </ViewContent>
      </ViewContainer>
    );
  }
}
