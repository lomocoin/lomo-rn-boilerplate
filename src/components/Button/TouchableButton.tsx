import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';

export default (Platform.OS === 'android'
  ? TouchableNativeFeedback
  : TouchableOpacity);
