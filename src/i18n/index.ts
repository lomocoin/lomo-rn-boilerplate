import { I18nManager } from 'react-native';
import i18n from 'react-native-i18n';

i18n.translations = {
  // English
  en: require('./en'),
  'en-US': require('./en'),
  'en-GB': require('./en'),
  // Chinese
  zh: require('./zh'),
  'zh-hans-tw': require('./zh'),
  'zh-hans': require('./zh'),
  'zh-Hans-CN': require('./zh'),
  'zh-Hans-US': require('./zh'),
  'zh-Hant-MO': require('./zh'),
  'zh-Hant-US': require('./zh'),
  'zh-Hant-TW': require('./zh'),
  'zh-Hant-HK': require('./zh'),
};
i18n.fallbacks = true;
i18n.defaultLocale = 'en';

I18nManager.allowRTL(i18n.locale in i18n.translations);

export class I18nUtils {
  replaceWithParams(text: string, params: any[]) {
    let result = text;
    params.forEach((value, index) => {
      const reg = new RegExp(`({)${index}(})`, 'g');
      result = result.replace(reg, value);
    });
    return result;
  }

  t(key: string) {
    return i18n.t(key);
  }

  tf(key: string, ...params: any[]) {
    return this.replaceWithParams(this.t(key), params);
  }
}

export default new I18nUtils();
