import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';

// components
import Weather from '../weather';
import Clicker from '../clicker';
import Bacon from '../bacon';
import Errors from '../errors';

// this generates fetch actions
import { createFetchAction } from 'redux-fetcher'

// roc error action
import { resetErrors } from './actions';

// clicker reducer
import { click } from '../../reducers/clicker';

// util
import { prefetchWeather, mergeWeatherProps } from './util';

import styles from './style.css';

// this maps values from redux store to props of this component
function mapStateToProps(state) {
    return {
        clicker: state.clicker,
        weather: state.weather,
        errors: state.errors
    };
}

// this maps action creators to dispatch, available as props on component
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ click, resetErrors, createFetchAction }, dispatch);
}

// prefetch triggers on both server and client
@provideHooks({ fetch: prefetchWeather })
// mergeWeatherProps enriches dispatch props with weatherForceFetch
@connect(mapStateToProps, mapDispatchToProps, mergeWeatherProps)
export default class Main extends React.Component {
    static propTypes = {
        // bound actions
        click: React.PropTypes.func.isRequired,
        resetErrors: React.PropTypes.func.isRequired,
        createFetchAction: React.PropTypes.func.isRequired,
        weatherForceFetch: React.PropTypes.func.isRequired,
        // connected values from store
        clicker: React.PropTypes.number,
        weather: React.PropTypes.object,
        errors: React.PropTypes.array
    };

    render() {
        return (
            <div className={styles.main}>
                <img src="/favicon.png" />
                <Errors errors={ this.props.errors } resetErrors= { this.props.resetErrors }/>
                <Clicker clicker={ this.props.clicker } click={ this.props.click }/>
                <Weather
                    payload={ this.props.weather.payload }
                    loading= { this.props.weather.loading }
                    endpoint={ this.props.weather.endpoint }
                    error={ this.props.weather.error }
                    fetchWeatherData={ this.props.weatherForceFetch }
                />
                <Bacon/>
            </div>
        );
    }
}
