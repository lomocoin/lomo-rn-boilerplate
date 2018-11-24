import React, { PureComponent } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import i18n from '../../i18n';
import { Icon, S, V } from '../../themes';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: V.primaryColor,
    height: 60,
    alignItems: 'center',
    borderRadius: 10,
    margin: 5,
  },
  textInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: V.paddingBase,
  },
});

interface IProps {
  onAddTodo: (todoText: string) => void;
}

export class TodoAdd extends PureComponent<IProps> {
  static defaultProps: {
    todo: {};
  };
  state = {
    inputText: '',
  };

  onChangeText = (inputText: string) => {
    this.setState({ inputText });
  };

  onSubmitEditing = () => {
    const { onAddTodo } = this.props;
    onAddTodo(this.state.inputText);
    this.setState({ inputText: '' });
  };

  render() {
    return (
      <View style={[styles.container, S.padding]}>
        <Icon name="circle-plus" size={28} color={V.whiteColor} />
        <TextInput
          style={[styles.textInput, S.textDefault, S.colorWhite]}
          returnKeyType="done"
          underlineColorAndroid="transparent"
          value={this.state.inputText}
          placeholderTextColor={V.whiteColor}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitEditing}
          placeholder={i18n.t('todo_list_add_placeholder')}
        />
      </View>
    );
  }
}
