import { Platform, Dimensions, I18nManager } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const isRTL = I18nManager.isRTL;
const deviceOS = Platform.OS;
const deviceOSVersion = DeviceInfo.getSystemVersion();
const deviceModel = DeviceInfo.getModel();
const { width, height } = Dimensions.get('window');

export default {
  isRTL,
  deviceOS,
  deviceOSVersion,
  deviceModel,

  // Sizes
  headerHeight: 44,
  tabbarHeight: 55,
  pgWidth: width,
  pgWidthHalf: width / 2,
  pgHeight: height,
  pgHeightHalf: height / 2,
  iOSStatusBarHeight: deviceModel === 'iPhone X' ? 44 : 20,
  paddingBase: 13, // Base global padding around a View

  // RTL start end
  start: isRTL ? 'right' : ('left' as any),
  end: isRTL ? 'left' : ('right' as any),
  flexStart: isRTL ? 'flex-end' : ('flex-start' as any),
  flexEnd: isRTL ? 'flex-start' : ('flex-end' as any),

  // Font sizes
  titleFontSize: 16,
  defaultFontSize: 14,
  secondaryFontSize: 12,
  headerFontSize: 20,

  // gap
  gap0: 0,
  gap5: 5,
  gap10: 10,
  gap15: 15,

  // border
  borderWidth: 1,
  borderRadius5: 5,

  // buttons
  btnHeight: 42,
  btnMiniHeight: 1.9,
  btnFontSize: 18,
  btnMiniFontSize: 14,
  btnBorderRadius: 15,
  btnMaxWidth: 320,
  btnMinWidth: 250,
  btnMiniMinWidth: 60,

  // forms
  fromCellMinHeight: 60,
};
