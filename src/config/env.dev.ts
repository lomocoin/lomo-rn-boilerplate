import { Platform } from 'react-native';

// NOTE: on android to access the localhost we need to use 10.0.2.2

export default {
  BASE_URL:
    Platform.OS === 'android'
      ? 'http://10.0.2.2:3000'
      : 'http://localhost:3000',
  APP_NAME: 'LomoRN',
};
