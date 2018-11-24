import { configure } from 'mobx';
import { flow, Instance, setLivelynessChecking, types } from 'mobx-state-tree';
// Stores
import { Auth as auth, IAuthStore } from './Auth';
import { ITodoStore, Todo as todo } from './Todo';
import { IUiStore, UI as ui } from './Ui';
import { IUserStore, User as user } from './User';
export { default as injectStores } from './injectStores';

configure({
  enforceActions: 'always',
});

export const STORE_VERSION = '010006';

export const Store = types
  .model('Store', {
    ui,
    auth,
    user,
    todo,
    isHydrated: false,
  })
  .actions(self => ({
    hydrate: flow(function* hydrate() {
      yield self.ui.hydrate(STORE_VERSION);
      yield self.auth.hydrate(STORE_VERSION);
      yield self.user.hydrate(STORE_VERSION);
      yield self.todo.hydrate(STORE_VERSION);
      self.isHydrated = true;
      return self;
    }),
  }))
  .create({
    ui: {},
    auth: {},
    user: {},
    todo: {},
  });

if (__DEV__) {
  setLivelynessChecking('error');
  // // tslint:disable-next-line
  // const Reactotron = require('reactotron-react-native').default;
  // // @ts-ignore
  // Reactotron.trackMstNode(Store);
}

export type IStore = Instance<typeof Store>;

export interface IUiStoreInjectedProps {
  ui: IUiStore;
}
export interface IAuthStoreInjectedProps {
  auth: IAuthStore;
}
export interface IUserStoreInjectedProps {
  user: IUserStore;
}

export interface ITodoStoreInjectedProps {
  todo: ITodoStore;
}
