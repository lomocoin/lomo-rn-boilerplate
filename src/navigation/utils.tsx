import React, { Component } from 'react';

/**
 * Make the navigation state params "this.props.navigation.state.params.<x>" become a component props
 * @param ScreenComponent Page component
 */
export const paramsToProps = (ScreenComponent: any) =>
  class extends Component<any> {
    static navigationOptions = ScreenComponent.navigationOptions;
    render() {
      const { params } = this.props.navigation.state;
      return <ScreenComponent {...this.props} {...params} />;
    }
  };
