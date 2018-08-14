import { axios } from '../utils/axios';
import { TodoModel } from '../models/Todo';

export default {
  getTodos: () => axios.get<TodoModel[], TodoModel[]>('/todos'),
  addTodo: (data: TodoModel) => axios.post<TodoModel, TodoModel>('/todos', data),
};
