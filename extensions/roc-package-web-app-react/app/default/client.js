import { createClient } from '../client';

import getRoutesAndStore from './get-routes-and-store';

const { store, routes, routerMiddlewareConfig } = getRoutesAndStore();

createClient({
    createRoutes: routes,
    createStore: store,
    mountNode: 'application',
    routerMiddlewareConfig,
});
