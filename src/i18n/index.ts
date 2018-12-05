import i18n, { DetectionPluginOptions } from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import RNLanguages from 'react-native-languages';
// @ts-ignore
import en from './translations/en.json';
// @ts-ignore
import zh from './translations/zh.json';

const languageDetector: DetectionPluginOptions = {
  type: 'languageDetector',
  async: true,
  detect: () => {
    return RNLanguages.language;
  },
  init: () => {
    // Empty
  },
  cacheUserLanguage: () => {
    // Empty
  },
};

const i18nNext = i18n
  .use(languageDetector)
  .use(reactI18nextModule)
  .init(
    {
      debug: __DEV__,
      fallbackLng: 'en',
      resources: {
        // English
        en,
        'en-US': en,
        'en-GB': en,
        // Chinese
        zh,
        'zh-hans-tw': zh,
        'zh-hans': zh,
        'zh-Hans-CN': zh,
        'zh-Hans-US': zh,
        'zh-Hant-MO': zh,
        'zh-Hant-US': zh,
        'zh-Hant-TW': zh,
        'zh-Hant-HK': zh,
      },
      ns: ['global'],
      defaultNS: 'global',
      interpolation: {
        escapeValue: false,
      },
      react: {
        wait: true,
        bindI18n: 'languageChanged loaded',
        bindStore: 'added removed',
        nsMode: 'default',
      },
    },
    error => {
      if (error) {
        // tslint:disable
        console.error(error);
      }
    },
  );

RNLanguages.addEventListener('change', ({ language }: { language: string }) => {
  i18nNext.changeLanguage(language);
});

// Add fallback for brackets variables in the translation key (e.g {0})
const replaceWithParams = (text: string, params: any[]) => {
  let result = text;
  params.forEach((value, index) => {
    const reg = new RegExp(`({)${index}(})`, 'g');
    result = result.replace(reg, value);
  });
  return result;
};
// @ts-ignore
i18nNext.tf = (key: string, ...params: any[]) => {
  return replaceWithParams(i18nNext.t(key), params);
};

export default i18nNext;
