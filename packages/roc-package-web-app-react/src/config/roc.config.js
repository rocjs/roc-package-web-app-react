export default {
    settings: {
        runtime: {
            stats: 'build/client/webpack-stats.json',
            applicationName: '',
            meta: [{
                name: 'viewport',
                content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
            }],
            link: [{
                rel: 'icon',
                href: 'favicon.png'
            }],
            // ROC_PATH will be replaced with what is defined in build.path
            base: {
                href: 'ROC_PATH',
                target: ''
            },
            script: [],
            ssr: true,
            clientBlocking: false,
            template: {
                path: '',
                name: 'main.html'
            },
            debug: {
                client: 'roc:*'
            },
            configWhitelistProperty: 'DANGEROUSLY_EXPOSE_TO_CLIENT'
        }
    }
};
