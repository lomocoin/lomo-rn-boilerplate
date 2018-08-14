import { inject, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { NavigationEventSubscription, NavigationInjectedProps } from 'react-navigation';
import Header from '../../components/Common/Header';
import ViewContainer from '../../components/Common/ViewContainer';
import ViewContent from '../../components/Common/ViewContent';
import { TodoAdd } from '../../components/Todo/TodoAdd';
import TodoItem from '../../components/Todo/TodoItem';
import i18n from '../../i18n';
import { TodoModel } from '../../models/Todo';
import { TodoStoreInjectedProps, UserStoreInjectedProps } from '../../stores';
import showToast from '../../utils/Toast';

interface Props
  extends NavigationInjectedProps,
    UserStoreInjectedProps,
    TodoStoreInjectedProps {}

@inject('user', 'todo')
@observer
export default class TodoList extends Component<Props> {
  onDidFocusSub: NavigationEventSubscription | undefined;

  componentWillMount() {
    const { navigation } = this.props;

    this.onDidFocusSub = navigation.addListener(
      'didFocus',
      this.componentDidFocused,
    );

    navigation.setParams({
      hideTab: true,
    });
  }

  componentDidMount() {
    this.refreshTodoList();
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
    todo.getTodos();
  };

  keyExtractor = (item: TodoModel) => `${item.id}`;

  handleAddTodo = (todoText: string) => {
    const { todo } = this.props;
    todo.addTodo(todoText);
  }

  handleToggleCheck = (id: number) => {
    const { todo } = this.props;
    todo.checkTodo(id).then(() => {
      showToast(i18n.t('todo_notify_completed'))
    });
  };

  handleSelectItem = (id: number) => {
    const { todo } = this.props;
    todo.deleteTodo(id).then(() => {
      showToast(i18n.t('todo_notify_deleted'))
    });
  };

  renderTodoItem = ({ item }: { item: TodoModel }) => {
    return (
      <TodoItem
        toggleCheck={this.handleToggleCheck}
        selectItem={this.handleSelectItem}
        item={item}
        id={item.id}
      />
    );
  };

  render() {
    const { todo } = this.props;
    const todoList = todo.todoList.filter(item => !item.checked);

    return (
      <ViewContainer>
        <Header title={i18n.t('todo_list_title')} hideBackButton />
        <ViewContent bounces>
          <TodoAdd onAddTodo={this.handleAddTodo} />
          <FlatList
            renderItem={this.renderTodoItem}
            onRefresh={this.refreshTodoList}
            refreshing={todo.isFetching}
            keyExtractor={this.keyExtractor}
            data={todoList}
          />
        </ViewContent>
      </ViewContainer>
    );
  }
}
