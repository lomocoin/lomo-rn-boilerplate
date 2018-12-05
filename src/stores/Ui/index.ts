import {
  applySnapshot,
  flow,
  Instance,
  onSnapshot,
  types,
} from 'mobx-state-tree';
import { AsyncStorage } from 'react-native';
import i18n from '../../i18n';

export const MODEL_NAME = 'UI';
export const UI = types
  .model(MODEL_NAME, {
    language: 'zh',
    isBeta: false,
  })
  .volatile(() => ({
    isLoading: false,
  }))
  .actions(self => ({
    setLanguage(language: string) {
      self.language = language;
      i18n.changeLanguage(language);
    },
    showLoading() {
      self.isLoading = true;
    },
    hideLoading() {
      self.isLoading = false;
    },
    hydrate: flow(function*(version: string) {
      applySnapshot(
        self,
        JSON.parse(
          (yield AsyncStorage.getItem(`${MODEL_NAME}_${version}`)) || '{}',
        ),
      );
      self.isLoading = false;
      onSnapshot(self, (snapshot: object) => {
        AsyncStorage.setItem(
          `${MODEL_NAME}_${version}`,
          JSON.stringify(snapshot),
        );
      });
    }),
  }));

export type IUiStore = Instance<typeof UI>;
