import { Instance, types } from 'mobx-state-tree';

export const TodoModel = types
  .model('TodoModel', {
    id: types.identifierNumber,
    title: types.string,
    checked: types.boolean,
    createdAt: types.maybeNull(types.number),
  })
  .actions(self => ({
    toggle() {
      self.checked = !self.checked;
    },
  }));

export type ITodoModel = Instance<typeof TodoModel>;
