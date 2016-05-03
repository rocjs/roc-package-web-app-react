export default {
    settings: {
        build: {
            input: { web: '', node: ''},

            reducers: 'reducers.js',
            useDefaultReducers: true,

            routes: 'routes.js',
            useDefaultRoutes: true,

            reduxMiddlewares: 'redux-middlewares.js',
            useDefaultReduxMiddlewares: true,

            clientLoading: '',
            // Consider using the config function to merge this with the previous
            resources: ['roc-package-web-app-react/styles/base.css'],

            templateValues: 'template-values.js'
        },
        dev: {
            // A11Y not play nice with Redux Devtools
            a11y: false,
            reduxDevtools: {
                enabled: true,
                position: 'right',
                size: 0.3,
                visibilityKey: 'ctrl-h',
                positionKey: 'ctrl-q',
                defaultVisible: false,
                theme: 'ocean'
            },

            reduxLogger: {
                level: 'info',
                collapsed: true,
                duration: true,
                timestamp: true
            },

            yellowbox: {
                enabled: true,
                ignore: ['[HMR]', 'Warning: React attempted to reuse markup in a container']
            }
        }
    }
};
