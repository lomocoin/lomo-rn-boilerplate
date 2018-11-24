import { observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, ButtonTypes } from '../../components/Button';
import Header from '../../components/Common/Header';
import ViewContainer from '../../components/Common/ViewContainer';
import ViewContent from '../../components/Common/ViewContent';
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
  extends IAuthStoreInjectedProps,
    IUserStoreInjectedProps,
    IUiStoreInjectedProps {}

interface IState {
  username: string;
  password: string;
  repeatPassword: string;
  showPassword: boolean;
}

@injectStores('auth', 'user', 'ui')
@observer
export default class Register extends Component<IProps, IState> {
  state = {
    username: '',
    password: '',
    repeatPassword: '',
    showPassword: true,
  };

  register = () => {
    if (!this.passVerification()) {
      return;
    }
    const { auth, user, ui } = this.props;
    const { username, password } = this.state;
    const params = {
      username,
      password,
    };

    ui.showLoading();

    auth
      .register(params)
      .then(() => user.getUser())
      .then(() => {
        navigate('App');
        ui.hideLoading();
      })
      .catch(error => {
        showToast(error);
        ui.hideLoading();
      });
  };

  setUsername = (text: string) => {
    this.setState({ username: text });
  };

  checkUsername = () => {
    const { username } = this.state;
    const reg = /^[a-zA-Z0-9_]{1,20}$/g;

    if (!reg.test(username)) {
      return showToast(i18n.t('register_invalid_name'));
    }
    return true;
  };

  checkPassword = () => {
    const { password } = this.state;
    const reg = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&])[0-9a-zA-Z!@#$%^&]{8,16}$/;

    if (!reg.test(password)) {
      return showToast(i18n.t('register_invalid_password'));
    }
    return true;
  };

  setPassword = (text: string) => {
    this.setState({ password: text });
  };

  checkRepeatPassword = () => {
    const { password, repeatPassword } = this.state;
    if (password !== repeatPassword) {
      return showToast(i18n.t('register_repeat_password_error'));
    }
    return true;
  };

  setRepeatPassword = (text: string) => {
    this.setState({ repeatPassword: text });
  };

  toggleShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  passVerification = () => {
    return (
      this.checkUsername() && this.checkPassword() && this.checkRepeatPassword()
    );
  };

  toggleLogin = () => {
    navigate('Login');
  };

  render() {
    const { showPassword } = this.state;
    return (
      <ViewContainer>
        <Header title={i18n.t('register_title')} />
        <ViewContent scrollable keyboardAvoidingView>
          <FormControl>
            <FormCell>
              <CellContent>{i18n.t('register_label_username')}</CellContent>
              <CellContent>
                <TextInput
                  underlineColorAndroid="transparent"
                  onBlur={this.checkUsername}
                  onChangeText={this.setUsername}
                />
              </CellContent>
            </FormCell>
            <View style={S.padding}>
              <Text style={S.textSecondary}>
                {i18n.t('register_rule_username')}
              </Text>
            </View>
            <FormCell>
              <CellContent>{i18n.t('register_label_password')}</CellContent>
              <CellContent>
                <TextInput
                  underlineColorAndroid="transparent"
                  secureTextEntry={showPassword}
                  onBlur={this.checkPassword}
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
            <View style={S.padding}>
              <Text style={S.textSecondary}>
                {i18n.t('register_rule_password')}
              </Text>
            </View>
            <FormCell>
              <CellContent>
                {i18n.t('register_label_repeat_password')}
              </CellContent>
              <CellContent>
                <TextInput
                  onBlur={this.checkRepeatPassword}
                  onChangeText={this.setRepeatPassword}
                  secureTextEntry={this.state.showPassword}
                />
              </CellContent>
            </FormCell>
          </FormControl>
          <View style={[S.flexRow, S.padding]}>
            <Text style={S.textDefaultLight}>
              {i18n.t('register_label_signin')}
            </Text>
            <Text
              style={[S.textDefaultLight, S.textUnderline, S.marginLeft5]}
              onPress={this.toggleLogin}
            >
              {i18n.t('register_btn_signin')}
            </Text>
          </View>
          <Button
            type={ButtonTypes.primary}
            marginTop={30}
            onPress={this.register}
          >
            {i18n.t('register_btn_signup')}
          </Button>
        </ViewContent>
      </ViewContainer>
    );
  }
}
