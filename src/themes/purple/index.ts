import variables from './variables';
import colors from './colors';
import images from './images';

const vars = {
  ...variables,
  ...colors,
};

export type VType = typeof vars;
export type IMAGESType = typeof images;

export default {
  V: vars,
  IMAGES: images,
};
