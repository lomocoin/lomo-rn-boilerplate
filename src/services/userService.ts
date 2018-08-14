import { axios } from '../utils/axios';
import { UserModel } from '../models/User';

export default {
  getUsers: () => axios.get<UserModel[], UserModel[]>('/users'),
};
