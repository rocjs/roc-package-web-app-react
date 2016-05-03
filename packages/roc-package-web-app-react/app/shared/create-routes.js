import React from 'react';
import Route from 'react-router/lib/Route';

import Application from './application';

/**
 * Route creator
 *
 * @param {!function} routes - A function that takes a reference to potential store and returns a React Router route
 * @returns {function} A function that takes a reference to a potential store, runs the `routes` function and wrapps the
 * result in a _Application component_ wrapper. See the README.md for more information on what it does.
 */
export default function createRoutes(routes) {
    return store => {
        const appRoutes = routes(store);

        return (
            <Route path="/" component={ Application }>
                { appRoutes }
            </Route>
        );
    };
}
