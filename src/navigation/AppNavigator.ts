import { createSwitchNavigator } from 'react-navigation';
import AuthStackNav from './AuthStackNav';
import AppStackNav from './AppStackNav';
import Splash from '../containers/Splash';

export default createSwitchNavigator(
  {
    Auth: AuthStackNav,
    App: AppStackNav,
    Splash,
  },
  {
    initialRouteName: 'Splash',
  },
);
