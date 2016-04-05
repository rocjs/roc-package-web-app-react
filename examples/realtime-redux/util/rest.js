/* globals __NODE__ */
import { appConfig } from 'roc-package-web-app-react/app/shared';

/**
 * Promises to return data from configured rest endpoint
 *
 * @return {Promise} data
 */
export function fetchServerData() {
    if (__NODE__) {
        let fetchTickers = [];
        const fetch = require('isomorphic-fetch');
        for (const ticker of appConfig.collect) {
            const tickerUrl = appConfig.restSource + encodeURIComponent(ticker);
            fetchTickers.push(fetch(tickerUrl));
        }

        return Promise.all(fetchTickers);
    }
}

/**
 * Promises to extract all tickers from raw responses
 *
 * @return {Promise} tickers
 */
export function getTickerData(responses) {
    const tickers = [];

    for (const response of responses) {
        if (response.status < 400) {
            tickers.push(response.json());
        }
    }

    return Promise.all(tickers);
}

/** Promises to create event objects from ticker data
 * @param {array} tickersData
 *
 * @return {Promise} ticker data
 */
export function createEventsFromTickerData(tickersData) {
    return new Promise((resolve) => {
        const events = [];

        for (const tickerJson of tickersData) {
            const eventJson = tickerJson[0];

            events.push({
                TICKER: eventJson.it,
                TIME: eventJson.tu,
                LAST: eventJson.la,
                CHANGE: eventJson.ch,
                LONG_NAME: eventJson.ln
            });
        }
        resolve(events);
    });
}

/** Event handling function using given dispatcher and handlers
 *
 * @param {function} dispatch
 * @param {function} onSuccess
 * @param {function} onError
 *
 * @return {function} eventHandler
 */
export function handleEvents(dispatch, onSuccess, onError) {
    return (events) => {
        return new Promise((resolve, reject) => {
            if (events.length > 0) {
                dispatch(onSuccess(events));
                return resolve(events.length);
            }

            dispatch(onError(new Error('No events found')));
            return reject(0);
        });
    };
}

/** Error handling function using given dispatcher and error handler
 *
 * @param {function} dispatch
 * @param {function} onError
 *
 * @return {function} errorHandler
 */
export function handleFetchDataError(dispatch, onError) {
    return (error) => {
        const errorAction = onError([error]);
        return dispatch(errorAction);
    };
}
