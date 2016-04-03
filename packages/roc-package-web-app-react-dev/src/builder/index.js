import path from 'path';
import {
    getAbsolutePath,
    fileExists
} from 'roc';
import { resolvePath } from 'roc-package-web-app-react';
/**
 * Creates a builder.
 *
 * @param {!string} target - a target: should be either "client" or "server"
 * @param {rocBuilder} rocBuilder - A rocBuilder to base everything on.
 * @param {!string} [resolver=roc-web-react/lib/helpers/get-resolve-path] - Path to the resolver for the server side
 * {@link getResolvePath}
 * @returns {rocBuilder}
 */
export default () => ({ settings: { build: buildSettings }, previousValue: rocBuilder }) => (target) => () => {
    let {
        buildConfig,
        builder,
        info
    } = rocBuilder;

    const DEV = buildSettings.mode === 'dev';
    const NODE = (target === 'node');
    const WEB = (target === 'web');

    if (NODE) {
        buildConfig.externals = [].concat([
            {
                'roc-package-web-app-react/src/helpers/read-stats': true,
                'roc-package-web-app-react/src/helpers/my-path': true
            }
        ], buildConfig.externals);
    }

    if (WEB) {
        buildConfig.plugins.push(
            new builder.IgnorePlugin(/^roc$/)
        );
    }

    buildConfig.resolveLoader.root.push(path.join(__dirname, '../../node_modules'));

    if (DEV) {
        buildConfig.resolve.fallback.push(
            path.join(__dirname, '../../node_modules')
        );
    }

    buildConfig.resolve.fallback.push(resolvePath);

    if (buildSettings.routes) {
        const routes = getAbsolutePath(buildSettings.routes);

        buildConfig.plugins.push(
            new builder.DefinePlugin({
                REACT_ROUTER_ROUTES: JSON.stringify(routes)
            })
        );
    }

    const hasReducers = !!(buildSettings.reducers && fileExists(buildSettings.reducers));
    if (hasReducers) {
        const reducers = getAbsolutePath(buildSettings.reducers);

        buildConfig.plugins.push(
            new builder.DefinePlugin({
                REDUX_REDUCERS: JSON.stringify(reducers)
            })
        );
    }

    const hasMiddlewares = !!(buildSettings.reduxMiddlewares && fileExists(buildSettings.reduxMiddlewares));
    if (hasMiddlewares) {
        const middlewares = getAbsolutePath(buildSettings.reduxMiddlewares);

        buildConfig.plugins.push(
            new builder.DefinePlugin({
                REDUX_MIDDLEWARES: JSON.stringify(middlewares)
            })
        );
    }

    const hasClientLoading = !!(buildSettings.clientLoading && fileExists(buildSettings.clientLoading));
    if (hasClientLoading) {
        const clientLoading = getAbsolutePath(buildSettings.clientLoading);

        buildConfig.plugins.push(
            new builder.DefinePlugin({
                ROC_CLIENT_LOADING: JSON.stringify(clientLoading)
            })
        );
    }

    buildConfig.plugins.push(
        new builder.DefinePlugin({
            USE_DEFAULT_REDUX_REDUCERS: buildSettings.useDefaultReducers,
            USE_DEFAULT_REDUX_MIDDLEWARES: buildSettings.useDefaultReduxMiddlewares,
            USE_DEFAULT_REACT_ROUTER_ROUTES: buildSettings.useDefaultRoutes,

            HAS_REDUX_REDUCERS: hasReducers,
            HAS_REDUX_MIDDLEWARES: hasMiddlewares,
            HAS_CLIENT_LOADING: hasClientLoading
        })
    );

    return {
        buildConfig,
        builder,
        info
    };
};
