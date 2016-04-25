import React, { Component } from 'react';

export default class Repo extends Component {
    static propTypes = {
        endpoint: React.PropTypes.string
    };

    render() {
        const source = this.props.endpoint ? ` from ${this.props.endpoint}` : '';

        return (
            <div>
                { `Loading repos data${source}...` }
            </div>
        );
    }
}
