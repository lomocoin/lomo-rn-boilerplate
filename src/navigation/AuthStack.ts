import { createStackNavigator } from 'react-navigation';
import { paramsToProps } from './utils';

// Auth
import Login from '../containers/Auth/Login';
import Register from '../containers/Auth/Register';

export default createStackNavigator(
  {
    Login: paramsToProps(Login),
    Register: paramsToProps(Register),
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    cardStyle: {
      shadowColor: 'transparent',
    },
  },
);
