import resolvePath from '../resolver';
import config from '../config/roc.config';
import meta from '../config/roc.config.meta';

export default {
    name: require('../../package.json').name,
    config,
    meta,
    actions: {
        react: {
            extension: 'roc-plugin-start',
            hook: 'get-resolve-paths',
            action: () => () => () => () => resolvePath
        }
    },
    packages: [
        require.resolve('roc-package-web-app')
    ],
    plugins: [
        require.resolve('roc-plugin-react')
    ]
};
