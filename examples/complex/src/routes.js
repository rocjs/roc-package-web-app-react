import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';

import App from './components/app';
import Main from './components/main';
import About from './components/about';
import Long from './components/long';
import Simple from './components/simple';

export default () => (
    <Route component={ App } value={false}>
        <IndexRoute component={ Main } value={true} scrollToTop />
        <Route path="about/" component={ About } data={2} ignoreScrollBehavior />
        <Route path="long/" component={ Long } />
        <Route path="simple/" component={ Simple } data={3} />
        <Route
            path="async"
            getComponent={ (nextState, callback) => {
                require.ensure([], (require) => {
                    const Async = require('./components/async').default;
                    callback(
                        null,
                        Async
                    );
                });
            }}
            data={4}
        />
    </Route>
);

export const middlewareConfig = {
    'react-router-scroll-async': {
        /*
        This function will allow us to do two things.

        1. Prevent the scroll behaviour on routes that has defined
        ignoreScrollBehavior on them to true or if a link has set
        the state with ignoreScrollBehavior to true.

        2. Make sure we go to the top of the page if scrollToTop
        has been defined on the route or on the state of the link
        transition.

        Route:
          <Route path="about/" component={ About } ignoreScrollBehavior />

        Link:
          <Link to={{ pathname: '/some/path', state: { scrollToTop: true } }} />Foo</Link>
        */
        shouldUpdateScroll: (prevRouterProps, { routes, location }) => {
            if (
                routes.some(route => route.ignoreScrollBehavior) ||
                location.state && location.state.ignoreScrollBehavior
            ) {
                return false;
            }

            if (
                routes.some(route => route.scrollToTop) ||
                location.state && location.state.scrollToTop
            ) {
                return [0, 0];
            }

            return true;
        },
    },
};
