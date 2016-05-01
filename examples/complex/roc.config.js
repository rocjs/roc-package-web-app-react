module.exports = {
    settings: {
        runtime: {
            applicationName: 'My Roc Application',
            serve: ['files', 'build/client']
        },
        build: {
            koaMiddlewares: 'src/koa-middlewares.js',
            reduxMiddlewares: 'src/middlewares.js',
            reducers: 'src/reducers.js',
            routes: 'src/routes.js',
            templateValues: 'src/template-values.js'
        }
    }
};
