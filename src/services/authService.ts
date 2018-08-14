import { axios } from '../utils/axios';
import { LoginParams, RegisterParams, AuthModel } from '../models/Auth';

export default {
  isLogin: () => axios.get<any, {}>('/checkToken'),
  register: (params: RegisterParams) =>
    axios.post<AuthModel, AuthModel>('/register', params),
  login: (params: LoginParams) => axios.post<AuthModel, AuthModel>('/signIn', params),
  logout: (params: LoginParams) => axios.post<AuthModel, AuthModel>('/signOut', params),
};
