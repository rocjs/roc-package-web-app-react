import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Main from './components/main';
import About from './components/about';

export default () => (
    <Route component={ App }>
        <IndexRoute component={ Main } />
        <Route path="about/" component={ About } />
    </Route>
);
