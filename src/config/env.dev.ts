import { Platform } from 'react-native';
const haveRemoteDev = (typeof DedicatedWorkerGlobalScope) !== 'undefined';

// NOTE: on android to access the localhost we need to use 10.0.2.2

export default {
  BASE_URL:
    // `adb reverse tcp:3000 tcp:3000` for port forward
    Platform.OS === 'android' && !haveRemoteDev || false
      ? 'http://10.0.2.2:3000'
      : 'http://localhost:3000',
  APP_NAME: 'LomoRN',
};
