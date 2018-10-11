import { Provider, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { Platform, SafeAreaView, YellowBox } from 'react-native';
import codePush from 'react-native-code-push';
import SplashScreen from 'react-native-splash-screen';
import StatusBar from './components/Common/StatusBar';
import LoadingModal from './containers/Common/Loading';
import AppNavigator from './navigation/AppNavigator';
import stores, {hydrateStores, storeProviderHOC} from './stores';

import { Navigation } from 'react-native-navigation';
import { Screens, startApp } from './containers';

Screens.forEach((ScreenComponent, key) =>
  Navigation.registerComponent(key, () => storeProviderHOC(ScreenComponent, stores, Provider)));

Navigation.events().registerAppLaunchedListener(()=>{
    hydrateStores()
    .then(startApp);
});

YellowBox.ignoreWarnings(['RNToastNative']);

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
};

// @observer
// class App extends Component {
//   componentDidMount() {
//     if (__DEV__) {
//       codePush.disallowRestart();
//     }

//     codePush.sync({
//       installMode: codePush.InstallMode.IMMEDIATE,
//     });

//     if (Platform.OS === 'android') {
//       SplashScreen.hide();
//     }
//   }

//   render() {
//     const { common } = stores;

//     return (
//       <Provider {...stores}>
//         <SafeAreaView style={S.flex}>
//           <StatusBar />
//           <AppNavigator />
//           <LoadingModal
//             isShow={common.isLoadingVisible}
//             isBlocking={common.isLoadingBlocking}
//             message={common.loadingMessage}
//           />
//         </SafeAreaView>
//       </Provider>
//     );
//   }
// }

// export default codePush(codePushOptions)(App);
