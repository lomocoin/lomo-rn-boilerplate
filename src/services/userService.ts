import { IUserModel } from '../stores/User/UserModel';
import { axios } from '../utils/axios';

export default {
  getUsers: () => axios.get<IUserModel[], IUserModel[]>('/users'),
};
