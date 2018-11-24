import { createIconSet } from 'react-native-vector-icons';

const glyphMap = {
  message: 59673,
  back: 59654,
  'business-card': 59666,
  contacts: 59667,
  'check-on': 59659,
  'check-off': 59660,
  'sort-down': 59657,
  'sort-up': 59658,
  'chevron-up': 59651,
  'chevron-down': 59652,
  'chevron-left': 58977,
  'chevron-right': 59003,
  'price-up': 58981,
  'price-down': 58976,
  'eye-close': 59026,
  'eye-open': 59027,
  'circle-plus': 59001,
  'circle-minus': 58997,
  'triangle-up': 59002,
  'triangle-down': 58994,
  'radio-off': 59017,
  success: 59653,
  'radio-on': 59018,
  error: 59010,
  'search-clear': 59006,
  info: 59011,
  help: 59028,
  search: 59007,
  close: 58989,
  tick: 59009,
  'msg-done': 59649,
  list: 58979,
  lock: 59650,
  invite: 59661,
  bill: 58983,
  cog: 58987,
  trash: 59013,
  'security-on': 59648,
  'security-off': 59016,
  vip: 59025,
  announcement: 59656,
};

const iconSet = createIconSet(glyphMap, 'icomoon', 'icomoon.ttf');

export default iconSet;

export const Button = iconSet.Button;
export const TabBarItem = iconSet.TabBarItem;
export const TabBarItemIOS = iconSet.TabBarItemIOS;
export const ToolbarAndroid = iconSet.ToolbarAndroid;
export const getImageSource = iconSet.getImageSource;
export type IconNames = keyof typeof glyphMap;
