import React, { Component } from 'react';

import styles from './style.css';

export default class WeatherData extends Component {
    static propTypes = {
        city: React.PropTypes.object,
        list: React.PropTypes.array
    };

    render() {
        return (
            <div>
                <h1>Fetched weather data</h1>
                City name: { this.props.city.name }<br/>
                Country: { this.props.city.country }<br/>

                <h3>Weather data:</h3>
                <div className={styles.data}>
                    { JSON.stringify(this.props.list) }
                </div>
            </div>
        );
    }
}
