import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import i18n from '../../i18n';
import { ITodoModel } from '../../stores/Todo/TodoModel';
import { Icon, S, V } from '../../themes';
import SwipeRow from '../Common/SwipeRow';

const styles = StyleSheet.create({
  container: {
    backgroundColor: V.whiteColor,
    minHeight: 70,
  },
  deleteContainer: {
    width: 70,
    backgroundColor: V.warningColor,
  },
});

interface IProps {
  item: ITodoModel;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

export default class TodoItem extends PureComponent<IProps> {
  handleComplete = () => {
    const { onComplete, item } = this.props;
    onComplete(item.id);
  };

  handleDelete = () => {
    const { onDelete, item } = this.props;
    onDelete(item.id);
  };

  handleDetails = () => {
    // TODO
  };

  render() {
    const { item } = this.props;
    const icon = item.checked ? 'check-on' : 'check-off';
    const iconColor = item.checked ? V.successColor : V.primaryColor;
    const textColor = item.checked ? V.successColor : V.defaultColor;

    return (
      <SwipeRow>
        <View style={S.pgWidth}>
          <TouchableOpacity
            onPress={this.handleDetails}
            style={[
              styles.container,
              S.flexRow,
              S.borderBottom,
              S.padding,
              S.flexAlignCenter,
            ]}
          >
            <TouchableOpacity onPress={this.handleComplete}>
              <Icon name={icon} size={22} style={{ color: iconColor }} />
            </TouchableOpacity>
            <Text
              style={[
                S.textDefault,
                S.marginLeft10,
                S.flex,
                { color: textColor },
              ]}
              numberOfLines={3}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={this.handleDelete}
          style={[
            styles.deleteContainer,
            S.flexJustifyCenter,
            S.flexAlignCenter,
          ]}
        >
          <Text style={[S.textDefault, S.colorWhite]}>
            {i18n.t('todo_action_delete')}
          </Text>
        </TouchableOpacity>
      </SwipeRow>
    );
  }
}
