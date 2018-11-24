import {
  NavigationActions,
  NavigationContainerComponent,
  NavigationParams,
  StackActions,
} from 'react-navigation';

let navigationContainer: NavigationContainerComponent;
let lastNavigateTime = Date.now();

export function tabNeedAuth(routeName: string) {
  return /Todo/.test(routeName);
}

export function setNavigator(container: NavigationContainerComponent) {
  navigationContainer = container;
}

export function setNavigationParams(params: any) {
  navigationContainer.props.navigation!.setParams(params);
}

export function navigateReset(routeName: string, params?: NavigationParams) {
  if (navigationContainer) {
    navigationContainer.dispatch(
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
  if (navigationContainer && lastNavigateTime + 500 < Date.now()) {
    navigationContainer.dispatch(
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
  if (navigationContainer && lastNavigateTime + 500 < Date.now()) {
    navigationContainer.dispatch(
      StackActions.push({
        routeName,
        params,
      }),
    );
    lastNavigateTime = Date.now();
  }
}

export function getCurrentRouteName(): string {
  if (!navigationContainer) {
    return '';
  }

  const { state } = navigationContainer.props.navigation as any;
  const route = state.routes[state.index];

  return route ? route.routeName : '';
}

export function goBack(): boolean {
  navigationContainer.dispatch(NavigationActions.back());
  return true;
}

export function pop(numToPop: number) {
  navigationContainer.dispatch(
    StackActions.pop({
      n: numToPop,
    }),
  );
}

export function replacePrevious(routeName: string, params?: NavigationParams) {
  if (navigationContainer && lastNavigateTime + 500 < Date.now()) {
    navigationContainer.dispatch(
      StackActions.replace({
        routeName,
        params,
      }),
    );
    lastNavigateTime = Date.now();
  }
}

export default {
  setNavigator,
  setNavigationParams,
  navigate,
  navigateReset,
  goBack,
  getCurrentRouteName,
  pop,
  tabNeedAuth,
  replacePrevious,
};
