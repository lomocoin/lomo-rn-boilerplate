import React, { Component } from 'react';

export default function storeProviderHOC(WrappedComponent, store, Provider) {
    return class extends Component {
        render() {
            return (
                <Provider {...store}>
                    <WrappedComponent {...this.props} />
                </Provider>
            );
        }
    };
};

