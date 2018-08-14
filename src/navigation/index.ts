import {
  NavigationActions,
  NavigationParams,
  NavigationScreenProp,
  StackActions,
} from 'react-navigation';

let navigation: NavigationScreenProp<any>;
let lastNavigateTime = Date.now();

export function setNavigator(container: any) {
  navigation = container;
}

export function navigateReset(routeName: string, params?: NavigationParams) {
  if (navigation) {
    navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName,
            params,
          }),
        ],
      }),
    );
  }
}

export function navigate(
  routeName: string,
  params?: NavigationParams,
  key: string = '',
) {
  if (navigation && lastNavigateTime + 500 < Date.now()) {
    navigation.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
        key,
      }),
    );
    lastNavigateTime = Date.now();
  }
}

export function push(routeName: string, params?: NavigationParams) {
  if (navigation && lastNavigateTime + 500 < Date.now()) {
    navigation.dispatch(
      StackActions.push({
        routeName,
        params,
      }),
    );
    lastNavigateTime = Date.now();
  }
}

export function getCurrentRouteName(): string {
  if (!navigation) {
    return '';
  }
  const { state } = navigation;
  const route = state && state.routes[state.index];
  return route ? route.routeName : '';
}

export function goBack(): boolean {
  navigation.dispatch(NavigationActions.back());
  return true;
}

export function pop(numToPop: number) {
  navigation.dispatch(
    StackActions.pop({
      n: numToPop,
    }),
  );
}

export default {
  setNavigator,
  navigate,
  navigateReset,
  goBack,
  getCurrentRouteName,
  pop,
};
