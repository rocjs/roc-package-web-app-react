import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Main from './components/main';
import About from './components/about';
import Simple from './components/simple';

export default () => (
    <Route component={ App } value={false}>
        <IndexRoute component={ Main } value={true}/>
        <Route path="about/" component={ About } data={2} />
        <Route path="simple/" component={ Simple } data={3} />
    </Route>
);
