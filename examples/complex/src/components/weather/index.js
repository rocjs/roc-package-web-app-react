import React, { Component } from 'react';

import styles from './style.css';

import WeatherLoader from './loader';
import WeatherError from './error';
import WeatherUpdateButton from './button';
import WeatherData from './data';

export default class Weather extends Component {
    static propTypes = {
        payload: React.PropTypes.object,
        loading: React.PropTypes.bool,
        endpoint: React.PropTypes.string,
        fetchWeatherData: React.PropTypes.func,
        error: React.PropTypes.bool
    };

    render() {
        const error = this.props.error;

        if (error) {
            return (
                <div>
                    <WeatherError error={ this.props.payload.error }/>
                    <WeatherUpdateButton
                        text="Try again, maybe errors were temporary"
                        onClick={ this.props.fetchWeatherData }
                    />
                </div>
            );
        }

        if (this.props.loading) {
            return (
                <WeatherLoader endpoint={ this.props.endpoint } />
            );
        }

        if (!this.props.payload && !this.props.loading) {
            return (
                <div>
                    No data provided
                    <WeatherUpdateButton
                        text="Try again, see if it provides data now"
                        onClick={ this.props.fetchWeatherData }
                    />
                </div>
            );
        }

        return (
            <div className={ styles.weather }>
                <WeatherData { ...this.props.payload }/> }
                <WeatherUpdateButton
                    text="Reload weather data"
                    onClick={ this.props.fetchWeatherData }
                />
            </div>
        );
    }
}
