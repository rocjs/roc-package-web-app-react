const path = require('path');

module.exports = {
    settings: {
        runtime: {
            applicationName: 'Extensible templates',
            serve: ['public'],
            template: {
                path: './views',
                name: 'entry.njk',
            },
        },
        build: {
            routes: './routes',
        },
    },
    project: {
        actions: [
            {
                hook: 'extend-template',
                action: () => () => () => ({
                    path: path.resolve('./views'),
                    namespace: 'testA',
                    template: 'A/a.njk',
                }),
            },
            {
                hook: 'extend-template',
                action: () => () => () => ({
                    namespace: 'testB',
                    template: 'B/b.njk',
                }),
            },
            {
                hook: 'extend-template',
                action: () => () => () => ({
                    namespace: 'testC',
                    template: 'C/c.njk',
                }),
            },
            {
                hook: 'get-template-values',
                action: () => () => (previousValue) => Object.assign(previousValue, {
                    project: Object.assign({}, previousValue.project, {
                        a: 'Custom data A',
                        b: 'B has additional custom data',
                    }),
                }),
            },
            {
                hook: 'get-template-values',
                action: () => () => (previousValue) => Object.assign(previousValue, {
                    project: Object.assign({}, previousValue.project, {
                        c: 'Merged with previous value',
                    }),
                }),
            },
        ],
    },
};
