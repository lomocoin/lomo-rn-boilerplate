import { axios } from '../utils/axios';

export interface ILoginParams {
  username: string;
  password: string;
}

export interface IRegisterParams {
  username: string;
  password: string;
}

export interface ITokenResponse {
  token: string;
}

export default {
  isLogin: () => axios.get<any, {}>('/checkToken'),
  register: (params: IRegisterParams) =>
    axios.post<ITokenResponse, ITokenResponse>('/register', params),
  login: (params: ILoginParams) =>
    axios.post<ITokenResponse, ITokenResponse>('/signIn', params),
  logout: (params: ILoginParams) =>
    axios.post<ITokenResponse, ITokenResponse>('/signOut', params),
};
