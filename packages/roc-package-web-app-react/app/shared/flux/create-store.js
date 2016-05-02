/* globals __DEV__ __WEB__ */

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';

import { rocConfig } from '../universal-config';

/**
 * Redux store creator
 *
 * @param {!object} reducers - Reducers that should be added to the store
 * @param {...function} middlewares - Redux middlewares that should be added to the store
 * @returns {function} A function that has the following interface:
 * `(callback) => (reduxReactRouter, getRoutes, createHistory, initialState)`.
 * The callback will be called when the application is in _DEV_ mode on the client as a way to add hot module update of
 * the reducers. The callback itself will take a function as the parameter that in turn takes the reducers to update.
 */
export default function createReduxStore(reducers, ...middlewares) {
    return (callback) =>
        (history, initialState) => {
            let finalCreateStore;

            if (__DEV__ && __WEB__) {
                const { persistState } = require('redux-devtools');
                const createLogger = require('redux-logger');
                const logger = createLogger({
                    level: rocConfig.dev.reduxLogger.level,
                    collapsed: rocConfig.dev.reduxLogger.collapsed,
                    duration: rocConfig.dev.reduxLogger.duration,
                    timestamp: rocConfig.dev.reduxLogger.timestamp
                });

                const debugMiddlewares = [logger];

                // Add the react-router-redux middleware
                middlewares.push(routerMiddleware(history));
                const devTools = window.devToolsExtension
                    ? window.devToolsExtension()
                    // TODO Enable maxAge support here. Will require a fix for validations in roc
                    // This should probably also additionally only be added if devtools is on in settings
                    : require('../../client/dev-tools').default.instrument();

                finalCreateStore = compose(
                    applyMiddleware(...middlewares, ...debugMiddlewares),
                    devTools,
                    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
                )(createStore);
            } else {
                finalCreateStore = compose(
                    applyMiddleware(...middlewares)
                )(createStore);
            }

            const reducer = combineReducers({
                routing: routerReducer,
                ...reducers
            });

            const store = finalCreateStore(reducer, initialState);

            if (__DEV__ && __WEB__ && module.hot) {
                // Enable Webpack hot module replacement for reducers
                callback((newReducers) => {
                    const nextRootReducer = combineReducers({
                        routing: routerReducer,
                        ...newReducers
                    });
                    store.replaceReducer(nextRootReducer);
                });
            }

            return store;
        };
}
