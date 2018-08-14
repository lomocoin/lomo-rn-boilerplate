import { action, computed, observable } from 'mobx';
import { Subject } from 'rxjs';
import { UserModel } from '../models/User';
import userService from '../services/userService';

export default class User {
  onUserChanges$: Subject<UserModel>;

  @computed
  get currentUser() {
    return (
      this.user || {
        username: 'Loading...',
      }
    );
  }
  @observable private user: UserModel | undefined;

  constructor() {
    this.onUserChanges$ = new Subject();
    this.user = undefined;
  }

  @action.bound
  clearStore() {
    this.user = undefined;
  }

  @action.bound
  async getUser() {
    const res = await userService.getUsers();
    return this.getUserSuccess(res[0]);
  }

  @action.bound
  getUserSuccess(user: UserModel) {
    this.user = { ...user };
    this.onUserChanges$.next(user);
    return Promise.resolve(user);
  }

  @action.bound
  refreshUserData() {
    return this.getUser();
  }
}
