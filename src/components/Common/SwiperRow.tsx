import React, { Component } from 'react';
import { PanResponder, View } from 'react-native';
import { S } from '../../themes';

interface Props {
  children: any;
}

interface State {
  currentLeft: number;
}

export default class SwiperRow extends Component<Props, State> {
  panResponder: any;
  previousLeft: number;
  state = {
    currentLeft: 0,
  };
  
  constructor(props: Props) {
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

  handleMoveShouldSetPanResponder = (event: any, gestureState: any) => {
    return Math.abs(gestureState.dx) > 10;
  };

  handlePanResponderMove = (event: any, gestureState: any) => {
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
        style={[
          { left: this.state.currentLeft },
          S.flexRow,
        ]}
      >
        {children}
      </View>
    );
  }
}
