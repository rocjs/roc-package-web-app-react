import React, { Component } from 'react';

export default class WeatherLoader extends Component {
    static propTypes = {
        endpoint: React.PropTypes.string
    };

    render() {
        const source = this.props.endpoint ? ` from ${this.props.endpoint}` : '';

        return (
            <div>
                { `Loading weather data${source}...` }
            </div>
        );
    }
}
