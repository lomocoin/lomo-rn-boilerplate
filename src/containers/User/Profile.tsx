import { observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import Badge from '../../components/Common/Badge';
import ViewContainer from '../../components/Common/ViewContainer';
import ViewContent from '../../components/Common/ViewContent';
import { CellContent, FormCell, FormControl } from '../../components/Form';
import i18n from '../../i18n';
import { navigate } from '../../navigation';
import { injectStores, IUserStoreInjectedProps } from '../../stores';
import { Icon, IMAGES, S, V } from '../../themes';

const styles = StyleSheet.create({
  userAvatarContainer: {
    margin: V.paddingBase,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: V.primaryColor,
    borderColor: 'rgba(255,255,255,0.1)',
    borderWidth: 10,
    borderRadius: 100,
  },
  userAvatarImage: {
    width: 100,
    height: 100,
  },
});

interface IProps extends NavigationInjectedProps, IUserStoreInjectedProps {}

@injectStores('user')
@observer
export default class Profile extends Component<IProps> {
  onDidFocusSub: any;

  componentDidMount() {
    const { navigation } = this.props;

    this.onDidFocusSub = navigation.addListener(
      'didFocus',
      this.componentDidFocused,
    );
  }

  componentWillUnmount() {
    if (this.onDidFocusSub) {
      this.onDidFocusSub.remove();
    }
  }

  componentDidFocused = () => {
    const { user } = this.props;
    user.refreshUserData();
  };

  openPage = (routeName: string) => () => {
    navigate(routeName);
  };

  render() {
    const { user } = this.props;

    return (
      <ViewContainer>
        <ViewContent scrollable bounces>
          <FormControl style={S.bgSecondary}>
            <FormCell isColumn>
              <View style={styles.userAvatarContainer}>
                <Image
                  style={styles.userAvatarImage}
                  source={IMAGES.user_avatar_placeholder}
                />
              </View>
              <CellContent
                fullwidth
                textStyle={[S.textTitle, S.textCenter, S.marginBottom]}
              >
                {user.currentUser.username}
              </CellContent>
            </FormCell>
          </FormControl>
          <FormControl style={S.marginTop}>
            <FormCell>
              <Icon
                name="vip"
                size={20}
                color={V.secondaryColor}
                style={S.marginRight10}
              />
              <CellContent fullwidth>{i18n.t('user_tab_menu_1')}</CellContent>
              <Badge value={2} />
            </FormCell>
            <FormCell onPress={this.openPage('code')}>
              <Icon
                name="help"
                size={20}
                color={V.secondaryColor}
                style={S.marginRight10}
              />
              <CellContent fullwidth>{i18n.t('user_tab_menu_2')}</CellContent>
            </FormCell>
          </FormControl>
          <FormControl style={S.marginTop}>
            <FormCell onPress={this.openPage('Share')}>
              <Icon
                name="invite"
                size={20}
                color={V.secondaryColor}
                style={S.marginRight10}
              />
              <CellContent fullwidth>{i18n.t('user_tab_share')}</CellContent>
            </FormCell>
            <FormCell onPress={this.openPage('Settings')}>
              <Icon
                name="cog"
                size={20}
                color={V.secondaryColor}
                style={S.marginRight10}
              />
              <CellContent fullwidth>{i18n.t('user_tab_settings')}</CellContent>
              <Badge value={1} showDot size={12} />
            </FormCell>
          </FormControl>
        </ViewContent>
      </ViewContainer>
    );
  }
}
