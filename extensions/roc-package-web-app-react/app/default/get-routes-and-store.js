/* global REACT_ROUTER_ROUTES, REDUX_REDUCERS, HAS_REDUX_REDUCERS, HAS_REDUX_MIDDLEWARES, REDUX_MIDDLEWARES,
    USE_DEFAULT_REDUX_REDUCERS, USE_DEFAULT_REDUX_MIDDLEWARES, USE_DEFAULT_REACT_ROUTER_ROUTES, __WEB__,
    HAS_REDUX_ENHANCERS, REDUX_ENHANCERS
*/
/* eslint-disable global-require */

export default function getRoutesAndStore() {
    let store = null;
    let routes = null;

    if (HAS_REDUX_REDUCERS) {
        const { createStore } = require('../shared');

        let defaultReducers = {};
        if (USE_DEFAULT_REDUX_REDUCERS) {
            defaultReducers = require('../shared').defaultReducers;
        }

        let middlewares = [];
        if (USE_DEFAULT_REDUX_MIDDLEWARES) {
            middlewares = middlewares.concat(require('../shared').defaultMiddlewares);
        }

        if (HAS_REDUX_MIDDLEWARES) {
            middlewares = middlewares.concat(require(REDUX_MIDDLEWARES).default());
        }

        let enhancers;
        if (HAS_REDUX_ENHANCERS) {
            enhancers = require(REDUX_ENHANCERS).default();
        }

        const reducers = {
            ...defaultReducers,
            ...require(REDUX_REDUCERS),
        };

        const storeCreator = createStore(
            reducers,
            middlewares,
            enhancers
        );

        let replaceReducers = null;
        if (__WEB__) {
            replaceReducers = (replaceReducer) => {
                module.hot.accept(require.resolve(REDUX_REDUCERS), () => {
                    replaceReducer({
                        ...defaultReducers,
                        ...require(REDUX_REDUCERS),
                    });
                });
            };
        }

        store = storeCreator(replaceReducers);
    }

    const { default: projectRoutes, middlewareConfig = {} } = require(REACT_ROUTER_ROUTES);

    if (USE_DEFAULT_REACT_ROUTER_ROUTES) {
        const { createRoutes } = require('../shared');

        routes = createRoutes(projectRoutes);
    } else {
        routes = require(REACT_ROUTER_ROUTES).default;
    }

    return {
        routerMiddlewareConfig: {
            'react-router-scroll-async': {},
            'react-router-redial': {},
            ...middlewareConfig,
        },
        routes,
        store,
    };
}
