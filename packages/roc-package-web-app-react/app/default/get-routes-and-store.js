/* global REACT_ROUTER_ROUTES REDUX_REDUCERS HAS_REDUX_REDUCERS HAS_REDUX_MIDDLEWARES REDUX_MIDDLEWARES
    USE_DEFAULT_REDUX_REDUCERS USE_DEFAULT_REDUX_MIDDLEWARES USE_DEFAULT_REACT_ROUTER_ROUTES
*/

export default function getRoutesAndStore(web = false) {
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

        const reducers = {
            ...defaultReducers,
            ...require(REDUX_REDUCERS)
        };

        const storeCreator = createStore(
            reducers,
            ...middlewares
        );

        let replaceReducers = null;
        if (web) {
            replaceReducers = (replaceReducer) => {
                module.hot.accept(require.resolve(REDUX_REDUCERS), () => {
                    replaceReducer({
                        ...defaultReducers,
                        ...require(REDUX_REDUCERS)
                    });
                });
            };
        }

        store = storeCreator(replaceReducers);
    }

    if (USE_DEFAULT_REACT_ROUTER_ROUTES) {
        const { createRoutes } = require('../shared');
        routes = createRoutes(require(REACT_ROUTER_ROUTES).default);
    } else {
        routes = require(REACT_ROUTER_ROUTES).default;
    }

    return {
        routes,
        store
    };
}
