import envDev from './env.dev';
import envProd from './env.prod';

export default __DEV__ ? envDev : envProd;