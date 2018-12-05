import { createStackNavigator } from 'react-navigation';
import Login from '../containers/Auth/Login';
import Register from '../containers/Auth/Register';
import { paramsToProps } from './utils';

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
