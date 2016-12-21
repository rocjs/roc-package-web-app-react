import { generateDependencies } from 'roc';
import { warn } from 'roc/log/default/large';

import config from '../config/roc.config';
import meta from '../config/roc.config.meta';

const packageJSON = require('../../package.json');

let warnForReactRouterScroll = true;

export default {
    config,
    meta,
    packages: [
        require.resolve('roc-package-web-app'),
    ],
    plugins: [
        require.resolve('roc-plugin-react'),
    ],
    dependencies: {
        exports: {
            ...generateDependencies(packageJSON, [
                'history',
                'intl',
                'intl-locales-supported',
                'react-helmet',
                'react-redux',
                'react-router',
                'react-router-redux',
                'react-server-status',
                'redial',
                'redux-saga',
                'react-router-redial',
                'react-router-scroll-async',
                'redux',
                'redux-thunk',
                'roc-package-web-app',
            ]),
            'react-router-scroll': {
                version: 'DEPRECATED - Use react-router-scroll-async',
                resolve: ({ request }) => {
                    // We will currently write out this two times, once when we build the application with webpack
                    // and once when we run it in Node. A nice way to give the warnings we print out more substance
                    // is to provide the instance that the function is running in, something we could provide.
                    if (warnForReactRouterScroll) {
                        warn(
                            'react-router-scroll is deprecated, please change references to react-router-scroll-async',
                            'Deprecation'
                        );
                    }
                    warnForReactRouterScroll = false;
                    return require.resolve(
                        request.replace('react-router-scroll', 'react-router-scroll-async')
                    );
                },
            },
        },
        uses: generateDependencies(packageJSON, [
            'nunjucks',
        ]),
    },
};
