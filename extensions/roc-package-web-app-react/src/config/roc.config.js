export default {
    settings: {
        runtime: {
            stats: 'build/client/webpack-stats.json',
            applicationName: undefined,
            head: {
                __raw: {},
                titleTemplate: undefined,
                htmlAttributes: {},
                meta: [{
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
                }],
                link: [{
                    rel: 'icon',
                    href: 'favicon.png',
                }],
                // ROC_PATH will be replaced with what is defined in build.path
                base: {
                    href: 'ROC_PATH',
                    target: undefined,
                },
                script: [],
                style: [],
            },
            ssr: true,
            template: {
                path: undefined,
                name: 'main.html',
            },
            debug: {
                client: 'roc:*',
            },
            configWhitelistProperty: 'DANGEROUSLY_EXPOSE_TO_CLIENT',
            fetch: {
                server: ['fetch'],
                client: {
                    blocking: ['fetch'],
                    defer: ['defer'],
                    parallel: false,
                },
            },
        },
    },
};
