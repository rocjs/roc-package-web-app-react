import React from 'react';

export default class ReduxContextContainer extends React.Component {

    static propTypes = {
        Component: React.PropTypes.func.isRequired,
        routerProps: React.PropTypes.object.isRequired
    };

    static contextTypes = {
        reduxContext: React.PropTypes.object.isRequired
    };

    render() {
        const { Component, routerProps } = this.props;
        const { loading } = this.context.reduxContext;

        return (
            <Component
                {...routerProps}
                loading={ loading }
            />
        );
    }
}
