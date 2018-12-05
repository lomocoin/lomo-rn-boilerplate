import { createIconSet } from 'react-native-vector-icons';

const glyphMap = ${glyphMap};

const iconSet = createIconSet(glyphMap, '${fontFamily}', '${fontFamily}.ttf');

export default iconSet;

export const Button = iconSet.Button;
export const TabBarItem = iconSet.TabBarItem;
export const TabBarItemIOS = iconSet.TabBarItemIOS;
export const ToolbarAndroid = iconSet.ToolbarAndroid;
export const getImageSource = iconSet.getImageSource;
export type IconNames = keyof typeof glyphMap;
