import { configure } from 'mobx';
import { enableLogging } from 'mobx-logger';
import { create } from 'mobx-persist';
import { AsyncStorage } from 'react-native';
import AuthStore from './Auth';
import CommonStore from './Common';
import TodoStore from './Todo';
import UserStore from './User';
export {default as storeProviderHOC} from './storeProviderHOC';

configure({
  enforceActions: true,
});

enableLogging({
  predicate: () => __DEV__ && Boolean(window.navigator.userAgent),
  action: true,
  reaction: false,
  transaction: false,
  compute: false,
});

export const common = new CommonStore();
export const auth = new AuthStore();
export const user = new UserStore();
export const todo = new TodoStore();

export interface CommonStoreInjectedProps {
  common: CommonStore;
}

export interface AuthStoreInjectedProps {
  auth: AuthStore;
}

export interface UserStoreInjectedProps {
  user: UserStore;
}

export interface TodoStoreInjectedProps {
  todo: TodoStore;
}

const hydrate = create({
  storage: AsyncStorage,
});

export async function hydrateStores() {
  await hydrate('common', common);
  await hydrate('auth', auth);
  return true;
}

export default {
  common,
  auth,
  user,
  todo,
};
