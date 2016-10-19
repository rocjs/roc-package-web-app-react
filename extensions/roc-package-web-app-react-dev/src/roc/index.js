import path from 'path';

import { lazyFunctionRequire, generateDependencies } from 'roc';

import config from '../config/roc.config.js';
import meta from '../config/roc.config.meta.js';

import { packageJSON } from './util';

const lazyRequire = lazyFunctionRequire(require);

export default {
    config,
    meta,
    dependencies: {
        exports: generateDependencies(packageJSON, [
            'react-a11y',
            'redux-devtools',
            'redux-devtools-log-monitor',
            'redux-devtools-dock-monitor',
            'redux-logger',
            'yellowbox-react',
        ]),
    },
    actions: [{
        hook: 'build-webpack',
        action: lazyRequire('../webpack'),
    }, {
        extension: 'roc',
        hook: 'update-settings',
        action: ({ context: { usedExtensions } }) => (readSettings) => () => {
            const settings = readSettings();
            const newSettings = { build: { input: {} } };

            const rocPackageWebAppReact = usedExtensions.find(({ name }) => name === 'roc-package-web-app-react');

            if (rocPackageWebAppReact) {
                if (!settings.build.input.web) {
                    newSettings.build.input.web = path.join(rocPackageWebAppReact.path, 'app/default/client.js');
                }

                if (!settings.build.input.node) {
                    newSettings.build.input.node = path.join(rocPackageWebAppReact.path, 'app/default/server.js');
                }

                if (settings.build.resources.length > 0) {
                    const resources = settings.build.resources.map((resource) => {
                        const matches = /^roc-package-web-app-react\/(.*)/.exec(resource);
                        if (matches && matches[1]) {
                            return path.join(rocPackageWebAppReact.path, `/${matches[1]}`);
                        }

                        return resource;
                    });

                    newSettings.build.resources = resources;
                }
            }

            // If a change has been done we will run the hook
            return newSettings;
        },
    }],
    packages: [
        require.resolve('roc-package-web-app-dev'),
    ],
    plugins: [
        require.resolve('roc-plugin-react-dev'),
    ],
};
