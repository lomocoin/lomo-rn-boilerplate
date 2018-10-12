import { Provider } from 'mobx-react/native';
import { YellowBox } from 'react-native';
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
