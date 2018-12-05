import {
  applySnapshot,
  destroy,
  flow,
  Instance,
  onSnapshot,
  types,
} from 'mobx-state-tree';
import { AsyncStorage } from 'react-native';
import todoService from '../../services/todoService';
import { TodoModel } from './TodoModel';

export const MODEL_NAME = 'Todo';
export const Todo = types
  .model(MODEL_NAME, {
    todos: types.optional(types.array(TodoModel), []),
  })
  .volatile(() => ({
    isFetching: false,
  }))
  .actions(self => ({
    addTodo(title: string) {
      self.todos.unshift(
        TodoModel.create({
          id: Math.floor(Math.random() * 10000 + 1),
          title,
          checked: false,
        }),
      );
    },
  }))
  .actions(self => ({
    checkTodo: flow(function*(id: number) {
      const todo = self.todos.find(item => item.id === id);
      return todo ? todo.toggle() : false;
    }),
    deleteTodo: flow(function*(id: number) {
      const todo = self.todos.find(item => item.id === id);
      return todo ? destroy(todo) : false;
    }),
    getTodoList: flow(function*() {
      self.isFetching = true;
      try {
        const data = yield todoService.getTodoList();
        self.todos.replace(data);
        self.isFetching = false;
      } catch (error) {
        self.isFetching = false;
        throw error;
      }
    }),
    hydrate: flow(function*(version: string) {
      applySnapshot(
        self,
        JSON.parse(
          (yield AsyncStorage.getItem(`${MODEL_NAME}_${version}`)) || '{}',
        ),
      );
      onSnapshot(self, (snapshot: object) => {
        AsyncStorage.setItem(
          `${MODEL_NAME}_${version}`,
          JSON.stringify(snapshot),
        );
      });
    }),
  }))
  .views(self => ({
    get allTodos() {
      return self.isFetching ? [] : self.todos.slice();
    },
    get openTodos() {
      return self.isFetching
        ? []
        : self.todos.filter(todo => !todo.checked).slice();
    },
  }));

export type ITodoStore = Instance<typeof Todo>;
