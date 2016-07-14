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
            'react-server-status',
            'redial',

            'react-router-redial',
            'redux',
            'redux-thunk',
            'roc-package-web-app',
        ]),
        uses: generateDependencies(packageJSON, [
            'nunjucks',
        ]),
    },
};
