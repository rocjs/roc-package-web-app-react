import React, { Component } from 'react';
import sharedStyles from '../shared.css';

export default class RepoUpdateButton extends Component {
    static propTypes = {
        text: React.PropTypes.string,
        onClick: React.PropTypes.func
    };

    render() {
        return (
            <button
                className={ sharedStyles.button }
                onClick={ this.props.onClick }>
                { this.props.text }
            </button>
        );
    }
}
