import base, { IMAGESType, VType } from './base';
import purple from './purple';
import styles from './styles';
export { default as Icon, IconNames } from './Icons';

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
