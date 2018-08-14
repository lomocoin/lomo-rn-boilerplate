import { action, observable } from 'mobx';
import { TodoModel } from '../models/Todo';
import todoService from '../services/todoService';

export default class Todo {
  @observable
  todoList: TodoModel[];
  @observable
  isFetching: boolean;

  constructor() {
    this.todoList = [];
    this.isFetching = false;
  }

  /**
   * Clear todoList
   */
  @action.bound
  clearStore() {
    this.todoList = [];
    this.isFetching = false;
  }

  @action.bound
  checkTodo(id: number) {
    this.todoList = this.todoList.map(
      todo =>
        todo.id === id ? { ...todo, ...{ checked: !todo.checked } } : todo,
    );
    return Promise.resolve(this.todoList);
  }

  @action.bound
  deleteTodo(id: number) {
    this.todoList = this.todoList.filter(item => item.id !== id);
    return Promise.resolve(this.todoList);
  }

  @action.bound
  async getTodos() {
    this.isFetching = true;
    try {
      const res = await todoService.getTodos();
      return this.getTodosSuccess(res);
    } catch (error) {
      this.getTodosFailed();
      throw error;
    }
  }

  @action.bound
  private getTodosSuccess(todos: TodoModel[]) {
    this.isFetching = false;
    this.todoList = todos;
    return Promise.resolve(this.todoList);
  }

  @action.bound
  private getTodosFailed() {
    this.isFetching = false;
    this.todoList = [];
  }

  @action.bound
  addTodo(text: string) {
    const data = {
      id: Math.floor(Math.random() * 100 + 1),
      title: text,
      checked: false,
    };
    return this.addTodoSuccess(data);
  }

  @action.bound
  private addTodoSuccess(todo: TodoModel) {
    this.todoList = [todo, ...this.todoList];
    return Promise.resolve(todo);
  }
}
