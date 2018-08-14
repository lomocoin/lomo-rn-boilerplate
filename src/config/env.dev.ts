import { Platform } from 'react-native';
import { getManufacturer } from 'react-native-device-info';

const isEmulator = Platform.OS === 'android' && getManufacturer() === 'unknown';

export default {
    BASE_URL: isEmulator ? 'http://10.0.2.2:3000' : 'http://localhost:3000',
    APP_NAME: 'LomoRN',
}
