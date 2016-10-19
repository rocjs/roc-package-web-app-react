module.exports = {
    settings: {
        runtime: {
            applicationName: 'Stock live demo',
            configWhitelistProperty: 'stock'
        },
        build: {
            routes: 'routes.js',
            reducers: 'reducers.js',
        },
    },
};
