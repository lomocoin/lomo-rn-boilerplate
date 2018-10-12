  import { Navigation } from 'react-native-navigation';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { iconsMap, iconsLoaded } from '../themes/base/icons';

import Splash from './Splash';
import Login from './Auth/Login';
import Register from './Auth/Register';
import TodoList from './Todo/TodoList';
import Profile from './User/Profile';
import Settings from './User/Settings';
import i18n from '../i18n';
import { V } from '../themes';

export const SPLASH = 'lomo.Splash';
export const LOGIN = 'lomo.Login';
export const REGISTER = 'lomo.Register';
export const TODOLIST = 'lomo.TodoList';
export const PROFILE = 'lomo.Profile';
export const SETTINGS = 'lomo.Settings';

export const Screens = new Map();

Screens.set(SPLASH, Splash);
Screens.set(LOGIN, Login);
Screens.set(REGISTER, Register);
Screens.set(PROFILE, Profile);
Screens.set(TODOLIST, TodoList);
Screens.set(SETTINGS, Settings);

export const startApp = () => {
  Navigation.setRoot({
    root: {
      stack: {
        id: 'ROOT_STACK',
        children: [{
          component: { name: SPLASH },
        }],
      },
    },
  });

};

export const startHomeTab = () => {
  iconsLoaded.then(() => {
    setRootToHomeTab();
  })
}

function setRootToHomeTab() {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: PROFILE,
                    passProps: {},
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: i18n.t('menu_tabbar_user'),
                  icon: iconsMap['ios-home'],
                  selectedIconColor: V.primaryColor,
                  iconColor: V.secondaryColor
                },
              },
            },
          },
          {
            component: {
              name: TODOLIST,
              passProps: {},
              options: {
                bottomTab: {
                  text: i18n.t('menu_tabbar_todo'),
                  icon: iconsMap['ios-list'],
                  selectedIconColor: V.primaryColor,
                  iconColor: V.secondaryColor
                },
              },
            },
          },
        ],
      },
    },
  });
}
