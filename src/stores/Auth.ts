import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';
import { Subject } from 'rxjs';
import authService from '../services/authService';
import { LoginParams, RegisterParams, AuthModel } from '../models/Auth';

export default class AuthStore {
  @observable isCheckLoginCompleted: boolean = false;
  @persist
  @observable
  token: string = '';

  onLoginCompleted$: Subject<boolean>;
  onLogoutCompleted$: Subject<boolean>;

  constructor() {
    this.onLoginCompleted$ = new Subject();
    this.onLogoutCompleted$ = new Subject();
  }

  @action.bound
  setCheckLoginCompleted() {
    this.isCheckLoginCompleted = true;
    this.onLoginCompleted$.next(true);
  }

  @action.bound
  async register(params: RegisterParams) {
    const res = await authService.register(params);
    return this.loginOrRegisterSuccess(res);
  }

  @action.bound
  async login(params: LoginParams) {
    const res = await authService.login(params);
    return this.loginOrRegisterSuccess(res);
  }

  @action.bound
  logout() {
    this.token = '';
    this.isCheckLoginCompleted = false;
    this.onLogoutCompleted$.next(true);
  }

  @action.bound
  loginOrRegisterSuccess(res: AuthModel): Promise<AuthModel> {
    this.token = res.token;
    return Promise.resolve(res);
  }

  @action.bound
  checkLogin() {
    return authService.isLogin();
  }
}
