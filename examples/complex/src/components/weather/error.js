import React, { Component } from 'react';

export default class WeatherError extends Component {
    static propTypes = {
        error: React.PropTypes.string
    };

    render() {
        return (
            <div>
                <h4>Error loading weather data.</h4>
                { this.props.error }
            </div>
        );
    }
}
