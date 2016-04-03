import { createFetchAction } from 'redux-fetcher';
import { FETCH_WEATHER  } from '../../fetch';

// construct a weathermap api URL for the given location name
export function buildWeatherUrl(location) {
    const query = location && encodeURIComponent(location) || 'moscow';
    return 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' +
        query +
        '&appid=44db6a862fba0b067b1930da0d769e98';
}

// compatible with redux-fetcher '@prefetch'
export function prefetchWeather({ dispatch, location }) {
    // fetch creates a redux action for us that will trigger
    // respective types WEATHER_FETCH_SUCCESS, WEATHER_FETCH_PENDING or WEATHER_FETCH_FAILURE
    const weatherAction = createFetchAction(FETCH_WEATHER, buildWeatherUrl(location.query.q));
    // dispatch the action
    return dispatch(weatherAction);
}

// compatible with react-redux third param 'mergeProps'
export function mergeWeatherProps(stateProps, dispatchProps, ownProps) {
    // enrich dispatch props with a weather forced fetch, typically used for buttons
    const newDispatchProps = {
        ...dispatchProps,
        weatherForceFetch: dispatchProps.createFetchAction.bind(
            undefined,
            FETCH_WEATHER,
            buildWeatherUrl(ownProps.location.query.q),
            { force: true, method: 'GET' }
        )
    };
    return Object.assign({}, ownProps, stateProps, newDispatchProps);
}
