import { ITodoModel } from '../stores/Todo/TodoModel';
import { axios } from '../utils/axios';

export default {
  getTodoList: () => axios.get<ITodoModel[], ITodoModel[]>('/todos'),
  addTodo: (data: ITodoModel) =>
    axios.post<ITodoModel, ITodoModel>('/todos', data),
};
