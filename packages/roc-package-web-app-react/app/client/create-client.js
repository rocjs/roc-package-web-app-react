/* global __DEV__ HAS_CLIENT_LOADING ROC_CLIENT_LOADING ROC_PATH */

import React from 'react';
import ReactDOM from 'react-dom';

import Router from 'react-router/lib/Router';
import useRouterHistory from 'react-router/lib/useRouterHistory';
import { createHistory } from 'history';

import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import debug from 'debug';

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

        let component;
        const history = useRouterHistory(createHistory)({
            basename: basename
        });

        if (createStore) {
            const store = createStore(history, window.FLUX_STATE);
            const theHistory = syncHistoryWithStore(history, store);

            const ReduxContext = require('./redux-context').default;

            let initalClientLoading = null;
            if (HAS_CLIENT_LOADING) {
                initalClientLoading = require(ROC_CLIENT_LOADING).default;
            }

            component = (
                <Router
                    history={ theHistory }
                    routes={ createRoutes(store) }
                    render={ (props) => <ReduxContext {...props} /> }
                    store={ store }
                    blocking={ rocConfig.runtime.clientBlocking }
                    initalClientLoading={ initalClientLoading }
                />
            );

            if (__DEV__) {
                if (rocConfig.dev.reduxDevtools.enabled) {
                    const DevTools = require('./dev-tools').default;

                    if (rocConfig.runtime.ssr) {
                        clientDebug('You will see a "Warning: React attempted to reuse markup in a container but the ' +
                            'checksum was invalid." message. That\'s because the redux-devtools are enabled.');
                    }

                    component = (
                        <div>
                            { component }
                            <DevTools />
                        </div>
                    );
                }

                if (rocConfig.dev.yellowbox.enabled) {
                    const YellowBox = require('yellowbox-react').default;

                    /* eslint-disable no-console */
                    console.ignoredYellowBox = rocConfig.dev.yellowbox.ignore;
                    /* eslint-enable */

                    if (rocConfig.runtime.ssr) {
                        clientDebug('You will see a "Warning: React attempted to reuse markup in a container but the ' +
                            'checksum was invalid." message. That\'s because the YellowBox is enabled.');
                    }

                    component = (
                        <div>
                            { component }
                            <YellowBox />
                        </div>
                    );
                }
            }

            component = (
                <Provider store={ store }>
                    { component }
                </Provider>
            );
        } else {
            component = (
                <Router
                    history={ history }
                    routes={ createRoutes() }
                />
            );
        }

        ReactDOM.render(component, node);
    };

    render();
}
