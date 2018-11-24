import {
  applySnapshot,
  flow,
  Instance,
  onSnapshot,
  types,
} from 'mobx-state-tree';
import { AsyncStorage } from 'react-native';
import authService, {
  ILoginParams,
  IRegisterParams,
} from '../../services/authService';
import { setAuthInfo } from '../../utils/axios';

export const MODEL_NAME = 'Auth';
export const Auth = types
  .model(MODEL_NAME, {
    token: types.maybeNull(types.string),
  })
  .actions(self => ({
    logout() {
      self.token = '';
    },
  }))
  .actions(self => ({
    setToken(token: string) {
      self.token = token;
      self.token = token;
      setAuthInfo(self.token!, self.logout);
    },
  }))
  .actions(self => ({
    login: flow(function*(params: ILoginParams) {
      const data = yield authService.login(params);
      if (!data.token) {
        throw new Error('No Token');
      }
      self.setToken(data.token);
      return data;
    }),
    register: flow(function*(params: IRegisterParams) {
      const data = yield authService.register(params);
      if (!data.token) {
        throw new Error('No Token');
      }
      self.setToken(data.token);
      return data;
    }),
    hydrate: flow(function*(version: string) {
      const data = yield AsyncStorage.getItem(`${MODEL_NAME}_${version}`);
      if (data) {
        applySnapshot(self, JSON.parse(data));
      }
      onSnapshot(self, (snapshot: object) => {
        AsyncStorage.setItem(
          `${MODEL_NAME}_${version}`,
          JSON.stringify(snapshot),
        );
      });
    }),
  }))
  .views(self => ({
    get isAuthorized() {
      return !!self.token;
    },
  }));

export type IAuthStore = Instance<typeof Auth>;
