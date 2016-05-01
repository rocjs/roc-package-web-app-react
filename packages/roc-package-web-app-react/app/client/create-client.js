/* global __DEV__ HAS_CLIENT_LOADING ROC_CLIENT_LOADING ROC_PATH HAS_REDUX_REDUCERS */

import React from 'react';
import ReactDOM from 'react-dom';

import Router from 'react-router/lib/Router';
import useRouterHistory from 'react-router/lib/useRouterHistory';
import { createHistory } from 'history';

import debug from 'debug';

import { RedialContext } from 'react-router-redial';
import { rocConfig } from '../shared/universal-config';

const clientDebug = debug('roc:client');

const basename = ROC_PATH === '/' ? null : ROC_PATH;

/**
 * Client entry point for React applications.
 *
 * @example
 * import { createClient } from 'roc-web-react/app/client';
 *
 * const server = createClient({
 *     createRoutes: routes,
 *     createStore: store,
 *     mountNode: 'application'
 * });
 *
 * @param {rocClientOptions} options - Options for the client
 */
export default function createClient({ createRoutes, createStore, mountNode }) {
    if (!createRoutes) {
        throw new Error(`createRoutes needs to be defined`);
    }

    if (!mountNode) {
        throw new Error(`mountNode needs to be defined`);
    }

    if (rocConfig) {
        debug.enable(rocConfig.runtime.debug.client);
    }

    if (__DEV__ && rocConfig.dev.a11y) {
        if (rocConfig.runtime.ssr) {
            clientDebug('You will see a "Warning: React attempted to reuse markup in a container but the checksum was' +
                ' invalid." message. That\'s because a11y is enabled.');
        }

        require('react-a11y')(React, {
            ReactDOM,
            // These needs to be added for Redux Devtools to be ignored by A11Y
            filterFn: (name) => [
                'LogMonitorButton',
                'LogMonitorAction',
                'JSONValueNode',
                'JSONNestedNode',
                'JSONArrow'
            ].indexOf(name) === -1
        });
    }

    const render = () => {
        const node = document.getElementById(mountNode);

        let history = useRouterHistory(createHistory)({
            basename: basename
        });

        let initialLoading = null;
        if (HAS_CLIENT_LOADING) {
            initialLoading = require(ROC_CLIENT_LOADING).default;
        }

        let routes;
        let locals = {};
        let createComponent = [(component) => component];

        if (HAS_REDUX_REDUCERS && createStore) {
            const { Provider } = require('react-redux');
            const { syncHistoryWithStore } = require('react-router-redux');

            const store = createStore(history, window.FLUX_STATE);
            history = syncHistoryWithStore(history, store);

            routes = createRoutes(store);
            locals = {
                dispatch: store.dispatch,
                getState: store.getState
            };

            createComponent.push((component) => (
                <Provider store={ store }>
                    { component }
                </Provider>
            ));

            if (__DEV__) {
                if (rocConfig.dev.reduxDevtools.enabled) {
                    const DevTools = require('./dev-tools').default;

                    if (rocConfig.runtime.ssr) {
                        clientDebug('You will see a "Warning: React attempted to reuse markup in a container but the ' +
                            'checksum was invalid." message. That\'s because the redux-devtools are enabled.');
                    }

                    createComponent.push((component) => (
                        <span>
                            { component }
                            <DevTools />
                        </span>
                    ));
                }
            }
        } else {
            routes = createRoutes();
        }

        if (__DEV__ && rocConfig.dev.yellowbox.enabled) {
            const YellowBox = require('yellowbox-react').default;

            /* eslint-disable no-console */
            console.ignoredYellowBox = rocConfig.dev.yellowbox.ignore;
            /* eslint-enable */

            if (rocConfig.runtime.ssr) {
                clientDebug('You will see a "Warning: React attempted to reuse markup in a container but the ' +
                    'checksum was invalid." message. That\'s because the YellowBox is enabled.');
            }

            createComponent.push((component) => (
                <span>
                    { component }
                    <YellowBox />
                </span>
            ));
        }

        const finalComponent = compose(createComponent)(
            <Router
                history={ history }
                routes={ routes }
                render={ (props) => (
                    <RedialContext
                        { ...props }
                        locals={ locals }
                        blocking={ rocConfig.runtime.fetch.client.blocking }
                        defer={ rocConfig.runtime.fetch.client.defer }
                        parallel={ rocConfig.runtime.fetch.client.parallel }
                        initialLoading={ initialLoading }
                    />
                )}
            />
        );

        ReactDOM.render(finalComponent, node);
    };

    render();
}

function compose(funcs) {
    if (funcs.length === 0) {
        return (arg) => arg;
    }

    const last = funcs[funcs.length - 1];
    const rest = funcs.slice(0, -1);
    return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args));
}
