import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import UserProfile from '../containers/User/Profile';
import TodoList from '../containers/Todo/TodoList';
import i18n from '../i18n';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { V, S } from '../themes';

export default createBottomTabNavigator(
  {
    UserMain: UserProfile,
    TodoMain: TodoList,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'UserMain':
            iconName = `ios-home`;
            break;
          case 'TodoMain':
            iconName = `ios-list`;
            break;
          default:
            iconName = 'ios-alert';
        }
        return (
          <Ionicons
            name={iconName}
            size={25}
            color={tintColor || V.defaultColor}
          />
        );
      },
      tabBarLabel: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let tabName;
        switch (routeName) {
          case 'UserMain':
            tabName = i18n.t('menu_tabbar_user');
            break;
          case 'TodoMain':
            tabName = i18n.t('menu_tabbar_todo');
            break;
          default:
            tabName = 'none';
        }
        return (
          <Text
            style={[
              S.textSecondary,
              S.textCenter,
              { color: tintColor || V.defaultColor },
            ]}
          >
            {tabName}
          </Text>
        );
      },
    }),
    initialRouteName: 'UserMain',
    tabBarOptions: {
      activeTintColor: V.primaryColor,
      inactiveTintColor: V.secondaryColor,
      tabStyle: {
        backgroundColor: V.whiteColor,
        paddingVertical: 5,
      },
    },
  },
);
