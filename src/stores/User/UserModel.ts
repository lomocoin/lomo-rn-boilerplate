import { Instance, types } from 'mobx-state-tree';

export const UserModel = types
  .model('UserModel', {
    id: types.identifierNumber,
    username: types.string,
    avatar: types.string,
    createdAt: types.maybeNull(types.number),
  })
  .actions(_ => ({
    //
  }));

export type IUserModel = Instance<typeof UserModel>;
