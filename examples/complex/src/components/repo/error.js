import React, { Component } from 'react';

export default class RepoError extends Component {
    static propTypes = {
        error: React.PropTypes.string
    };

    render() {
        return (
            <div>
                <h4>Error loading repos data.</h4>
                { this.props.error }
            </div>
        );
    }
}
