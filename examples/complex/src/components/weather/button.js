import React, { Component } from 'react';

export default class WeatherUpdateButton extends Component {
    static propTypes = {
        text: React.PropTypes.string,
        onClick: React.PropTypes.func
    };

    render() {
        return (
            <button onClick={ (this.props.onClick) }>
                { this.props.text }
            </button>
        );
    }
}
