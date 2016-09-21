module.exports = {
    settings: {
        runtime: {
            applicationName: 'My Roc Application',
            serve: ['files', 'build/client'],
            fetch: {
                server: ['fetch', 'defer']
            }
        },
        build: {
            koaMiddlewares: 'src/koa-middlewares.js',
            redux: {
                middlewares: 'src/middlewares.js',
            },
            reducers: 'src/reducers.js',
            routes: 'src/routes.js',
            templateValues: 'src/template-values.js'
        }
    }
};
