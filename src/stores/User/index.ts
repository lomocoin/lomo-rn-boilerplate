import {
  applySnapshot,
  flow,
  Instance,
  onSnapshot,
  types,
} from 'mobx-state-tree';
import { AsyncStorage } from 'react-native';
import userService from '../../services/userService';
import { UserModel } from './UserModel';

export const MODEL_NAME = 'User';
export const User = types
  .model(MODEL_NAME, {
    user: types.maybeNull(UserModel),
  })
  .actions(self => ({
    getUser: flow(function*() {
      const data = yield userService.getUsers();
      self.user = UserModel.create(data[0]);
      return data;
    }),
    refreshUserData() {
      return this.getUser();
    },
    hydrate: flow(function*(version: string) {
      applySnapshot(
        self,
        JSON.parse(
          (yield AsyncStorage.getItem(`${MODEL_NAME}_${version}`)) || '{}',
        ),
      );
      onSnapshot(self, (snapshot: object) => {
        AsyncStorage.setItem(
          `${MODEL_NAME}_${version}`,
          JSON.stringify(snapshot),
        );
      });
    }),
  }))
  .views(self => ({
    get currentUser() {
      return (
        self.user || {
          username: 'Loading...',
        }
      );
    },
  }));

export type IUserStore = Instance<typeof User>;
