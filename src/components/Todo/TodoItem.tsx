import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import i18n from '../../i18n';
import { TodoModel } from '../../models/Todo';
import { S, V } from '../../themes';
import SwiperRow from '../Common/SwiperRow';

const styles = StyleSheet.create({
  container: {
    backgroundColor: V.whiteColor,
    minHeight: 70,
  },
  deleteContainer: {
    width: 70,
    backgroundColor: V.warnColor,
  },
});

interface Props {
  item: TodoModel;
  toggleCheck: (id: number) => void;
  selectItem: (id: number) => void;
  id: number;
}

export default class TodoItem extends PureComponent<Props> {
  checkItem = () => {
    const { toggleCheck, id } = this.props;
    toggleCheck(id);
  };

  // TO DO: go to detail page
  viewDetails = () => {
    // navigate()
  };

  deleteItem = () => {
    const { selectItem, id } = this.props;
    selectItem(id);
  };

  render() {
    const { item } = this.props;
    const icon = item.checked ? 'md-checkbox-outline' : 'md-square-outline';
    const iconColor = item.checked ? V.successColor : V.primaryColor;
    const textColor = item.checked ? V.successColor : V.defaultColor;

    return (
      <SwiperRow>
        <View style={S.pgWidth}>
          <TouchableOpacity
            onPress={this.viewDetails}
            style={[
              styles.container,
              S.flexRow,
              S.borderBottom,
              S.padding,
              S.flexAlignCenter,
            ]}
          >
            <TouchableOpacity onPress={this.checkItem}>
              <Icon
                name={icon}
                size={22}
                style={{ color: iconColor }}
              />
            </TouchableOpacity>
            <Text
              style={[S.textDefault, S.marginLeft10, S.flex, { color: textColor }]}
              numberOfLines={3}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={this.deleteItem}
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
      </SwiperRow>
    );
  }
}
