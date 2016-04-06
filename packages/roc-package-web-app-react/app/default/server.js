import { createServer, useReact } from '../server';

import getRoutesAndStore from './get-routes-and-store';

const { store, routes } = getRoutesAndStore();

useReact(createServer)({
    createRoutes: routes,
    createStore: store
}).start();
