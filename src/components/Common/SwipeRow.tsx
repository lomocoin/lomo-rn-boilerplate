import React, { Component } from 'react';
import { PanResponder, View } from 'react-native';
import { S } from '../../themes';

interface IProps {
  children: any;
}

interface IState {
  currentLeft: number;
}

export default class SwipeRow extends Component<IProps, IState> {
  panResponder: any;
  previousLeft: number;
  state = {
    currentLeft: 0,
  };

  constructor(props: IProps) {
    super(props);
    this.previousLeft = 0;

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd,
      onShouldBlockNativeResponder: () => false,
    });
  }

  handleMoveShouldSetPanResponder = (_: any, gestureState: any) => {
    return Math.abs(gestureState.dx) > 10;
  };

  handlePanResponderMove = (_: any, gestureState: any) => {
    const { currentLeft } = this.state;
    if (this.previousLeft === 0) {
      this.previousLeft = currentLeft;
    }
    let nowLeft = this.previousLeft + gestureState.dx / 0.5;
    nowLeft = Math.max(nowLeft, -70);
    nowLeft = Math.min(nowLeft, 0);
    this.setState({ currentLeft: nowLeft });
  };

  handlePanResponderEnd = () => {
    this.previousLeft = this.state.currentLeft;
  };

  render() {
    const { children } = this.props;
    return (
      <View
        {...this.panResponder.panHandlers}
        style={[{ left: this.state.currentLeft }, S.flexRow]}
      >
        {children}
      </View>
    );
  }
}
