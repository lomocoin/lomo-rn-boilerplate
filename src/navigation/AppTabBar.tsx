import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import TodoList from '../containers/Todo/TodoList';
import UserProfile from '../containers/User/Profile';
import i18n from '../i18n';
import { Icon, S, V } from '../themes';

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
            iconName = `business-card`;
            break;
          case 'TodoMain':
            iconName = `message`;
            break;
          default:
            iconName = 'ios-alert';
        }
        return (
          <Icon name={iconName} size={25} color={tintColor || V.defaultColor} />
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
        height: 60,
        backgroundColor: V.whiteColor,
        paddingVertical: 5,
      },
    },
  },
);
