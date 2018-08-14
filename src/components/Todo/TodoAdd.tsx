import React, { PureComponent } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import i18n from '../../i18n';
import { S, V } from '../../themes';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: V.primaryColor,
    height: 60,
    alignItems: 'center',
    borderRadius: 10,
    margin: 5,
  },
  statusText: {
    color: V.successColor,
  },
});

interface Props {
  onAddTodo: (todoText: string) => void;
}

export class TodoAdd extends PureComponent<Props> {
  static defaultProps: {
    todo: {},
  };
  state= {
    inputText: ''
  };

  onChangeText = (inputText: string) => {
    this.setState({ inputText });
  }

  onSubmitEditing = () => {
    const { onAddTodo } = this.props;
    onAddTodo(this.state.inputText);
    this.setState({ inputText: '' })
  }

  render() {
    return (
      <View style={[styles.container,S.padding]}>
        <Icon name="plus" size={28} color={V.whiteColor} />
        <TextInput
            style={[S.textDefault, S.colorWhite, S.flex, S.paddingLeft10]}
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