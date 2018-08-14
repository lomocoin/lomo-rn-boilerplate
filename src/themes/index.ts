import styles from './styles';
// Base Theme
import base, { VType, IMAGESType } from './base';
// Custom Themes
import purple from './purple';

export interface IThemeConfig {
  V: VType;
  IMAGES: IMAGESType;
}

function applyTheme(...theme: IThemeConfig[]) {
  return theme.reduce((prev, curr) => ({
    V: {
      ...prev.V,
      ...curr.V,
    },
    IMAGES: {
      ...prev.IMAGES,
      ...curr.IMAGES,
    },
  }));
}

export const { V, IMAGES } = applyTheme(base, purple as any);

export const S = {
  ...styles(V),
};
