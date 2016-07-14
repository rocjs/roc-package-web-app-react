import { createClient } from '../client';
import getRoutesAndStore from './get-routes-and-store';

const { store, routes } = getRoutesAndStore(true);

createClient({
    createRoutes: routes,
    createStore: store,
    mountNode: 'application',
});
