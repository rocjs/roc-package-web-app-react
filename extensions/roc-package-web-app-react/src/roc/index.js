import { generateDependencies } from 'roc';

import config from '../config/roc.config';
import meta from '../config/roc.config.meta';

const packageJSON = require('../../package.json');

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
        exports: generateDependencies(packageJSON, [
            'history',
            'react-helmet',
            'react-redux',
            'react-router',
            'react-router-redux',
            'react-router-redial',
            'react-server-status',
            'redial',
            'pretty-error',
            'nunjucks',
            'serialize-javascript',
            'redux',
            'redux-thunk',
            'roc-package-web-app',
        ]),
        uses: generateDependencies(packageJSON, [
            'nunjucks',
            'react-router-redux',
            'redux',
            'redux-logger',
            'redux-thunk',
        ]),
    },
};
