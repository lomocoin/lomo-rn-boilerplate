import { createStackNavigator } from 'react-navigation';

// App Screens
import AppTabbar from './AppTabbar';
import Settings from '../containers/User/Settings';

export default createStackNavigator(
  {
    AppTabbar,
    Settings,
  },
  {
    headerMode: 'none',
    initialRouteName: 'AppTabbar',
    cardStyle: {
      shadowColor: 'transparent',
    },
  },
);
