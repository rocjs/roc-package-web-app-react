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
            const normalMiddlewares = [].concat(middlewares);

            // Add the react-router-redux middleware
            normalMiddlewares.push(routerMiddleware(history));

            if (__DEV__ && __WEB__) {
                const { persistState } = require('redux-devtools'); // eslint-disable-line
                const createLogger = require('redux-logger'); // eslint-disable-line
                const logger = createLogger({ ...rocConfig.dev.redux.logger });

                const debugMiddlewares = [logger];

                let devTools = (input) => input;
                if (rocConfig.dev.redux.devTools.enabled) {
                    devTools = window.devToolsExtension
                        ? window.devToolsExtension()
                        // eslint-disable-next-line
                        : require('../../client/dev-tools').default.instrument(rocConfig.dev.redux.devTools.instrument);
                }

                finalCreateStore = compose(
                    applyMiddleware(...normalMiddlewares, ...debugMiddlewares),
                    devTools,
                    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
                )(createStore);
            } else {
                finalCreateStore = compose(
                    applyMiddleware(...normalMiddlewares)
                )(createStore);
            }

            const reducer = combineReducers({
                routing: routerReducer,
                ...reducers,
            });

            const store = finalCreateStore(reducer, initialState);

            if (__DEV__ && __WEB__ && module.hot) {
                // Enable Webpack hot module replacement for reducers
                callback((newReducers) => {
                    const nextRootReducer = combineReducers({
                        routing: routerReducer,
                        ...newReducers,
                    });
                    store.replaceReducer(nextRootReducer);
                });
            }

            return store;
        };
}
