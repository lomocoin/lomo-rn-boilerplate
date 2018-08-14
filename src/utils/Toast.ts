import { Platform } from 'react-native';
import Toast from 'react-native-toast-native';
import { V } from '../themes';

const styles = {
  backgroundColor: V.primaryColor,
  width: 300,
  height: Platform.OS === 'ios' ? 50 : 100,
  color: '#ffffff',
  fontSize: 15,
  lineHeight: 2,
  lines: 4,
  borderRadius: 15,
  fontWeight: 'bold',
  yOffset: 40,
};

export default function showToast(
  content: string,
  duration = 'SHORT',
  position = 'BOTTOM',
) {
  Toast.show(content, Toast[duration], Toast[position], styles);
}
