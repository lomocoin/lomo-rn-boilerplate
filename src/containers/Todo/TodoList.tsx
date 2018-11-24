import { observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import {
  NavigationEventSubscription,
  NavigationInjectedProps,
} from 'react-navigation';
import Header from '../../components/Common/Header';
import ViewContainer from '../../components/Common/ViewContainer';
import ViewContent from '../../components/Common/ViewContent';
import { TodoAdd } from '../../components/Todo/TodoAdd';
import TodoItem from '../../components/Todo/TodoItem';
import i18n from '../../i18n';
import {
  injectStores,
  ITodoStoreInjectedProps,
  IUserStoreInjectedProps,
} from '../../stores';
import { ITodoModel } from '../../stores/Todo/TodoModel';
import showToast from '../../utils/Toast';

interface IProps
  extends NavigationInjectedProps,
    IUserStoreInjectedProps,
    ITodoStoreInjectedProps {}

@injectStores('user', 'todo')
@observer
export default class TodoList extends Component<IProps> {
  onDidFocusSub: NavigationEventSubscription | undefined;

  componentWillMount() {
    const { navigation } = this.props;

    this.onDidFocusSub = navigation.addListener(
      'didFocus',
      this.componentDidFocused,
    );
  }

  componentWillUnmount() {
    if (this.onDidFocusSub) {
      this.onDidFocusSub.remove();
    }
  }

  componentDidFocused = () => {
    this.refreshTodoList();
  };

  refreshTodoList = () => {
    const { todo } = this.props;
    todo.getTodoList();
  };

  handleAddTodo = (todoText: string) => {
    const { todo } = this.props;
    todo.addTodo(todoText);
  };

  handleCompleteTodo = (id: number) => {
    const { todo } = this.props;
    todo.checkTodo(id).then(() => {
      showToast(i18n.t('todo_notify_completed'));
    });
  };

  handleDeleteTodo = (id: number) => {
    const { todo } = this.props;
    todo.deleteTodo(id).then(() => {
      showToast(i18n.t('todo_notify_deleted'));
    });
  };

  keyExtractor = (item: ITodoModel) => `${item.id}`;

  renderTodoItem = ({ item }: { item: ITodoModel }) => {
    return (
      <TodoItem
        item={item}
        onComplete={this.handleCompleteTodo}
        onDelete={this.handleDeleteTodo}
      />
    );
  };

  render() {
    const { todo } = this.props;

    return (
      <ViewContainer>
        <Header title={i18n.t('todo_list_title')} hideBackButton />
        <ViewContent bounces>
          <TodoAdd onAddTodo={this.handleAddTodo} />
          <FlatList
            data={todo.openTodos}
            refreshing={todo.isFetching}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderTodoItem}
            onRefresh={this.refreshTodoList}
          />
        </ViewContent>
      </ViewContainer>
    );
  }
}
