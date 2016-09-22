import { getAbsolutePath, fileExists } from 'roc';
import webpack from 'webpack';

export default ({
    context: { config: { settings: { build: buildSettings } } },
    previousValue: webpackConfig,
}) => (target) => () => {
    const newWebpackConfig = { ...webpackConfig };

    const WEB = (target === 'web');

    if (WEB) {
        newWebpackConfig.plugins.push(
            new webpack.IgnorePlugin(/^roc$/)
        );
    }

    if (buildSettings.routes) {
        const routes = getAbsolutePath(buildSettings.routes);

        newWebpackConfig.plugins.push(
            new webpack.DefinePlugin({
                REACT_ROUTER_ROUTES: JSON.stringify(routes),
            })
        );
    }

    const hasReducers = !!(buildSettings.reducers && fileExists(buildSettings.reducers));
    if (hasReducers) {
        const reducers = getAbsolutePath(buildSettings.reducers);

        newWebpackConfig.plugins.push(
            new webpack.DefinePlugin({
                REDUX_REDUCERS: JSON.stringify(reducers),
            })
        );
    }

    const hasMiddlewares = !!(buildSettings.redux.middlewares && fileExists(buildSettings.redux.middlewares));
    if (hasMiddlewares) {
        const middlewares = getAbsolutePath(buildSettings.redux.middlewares);

        newWebpackConfig.plugins.push(
            new webpack.DefinePlugin({
                REDUX_MIDDLEWARES: JSON.stringify(middlewares),
            })
        );
    }

    const hasClientLoading = !!(buildSettings.clientLoading && fileExists(buildSettings.clientLoading));
    if (hasClientLoading) {
        const clientLoading = getAbsolutePath(buildSettings.clientLoading);

        newWebpackConfig.plugins.push(
            new webpack.DefinePlugin({
                ROC_CLIENT_LOADING: JSON.stringify(clientLoading),
            })
        );
    }

    const hasTemplateValues = !!(buildSettings.templateValues && fileExists(buildSettings.templateValues));
    if (hasTemplateValues) {
        const templateValues = getAbsolutePath(buildSettings.templateValues);

        newWebpackConfig.plugins.push(
            new webpack.DefinePlugin({
                TEMPLATE_VALUES: JSON.stringify(templateValues),
            })
        );
    }

    newWebpackConfig.plugins.push(
        new webpack.DefinePlugin({
            USE_DEFAULT_REDUX_REDUCERS: buildSettings.redux.useDefaultReducers,
            USE_DEFAULT_REDUX_MIDDLEWARES: buildSettings.redux.useDefaultMiddlewares,
            USE_DEFAULT_REACT_ROUTER_ROUTES: buildSettings.useDefaultRoutes,

            HAS_REDUX_REDUCERS: hasReducers,
            HAS_REDUX_MIDDLEWARES: hasMiddlewares,
            HAS_CLIENT_LOADING: hasClientLoading,
            HAS_TEMPLATE_VALUES: hasTemplateValues,
        })
    );

    return newWebpackConfig;
};
