/* eslint-disable global-require */
import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/lib/Router';
import match from 'react-router/lib/match';

function renderSync({ renderProps, createComponent, routerRenderFn }, node) {
    const finalComponent = createComponent(
        <Router
            {...renderProps}
            render={routerRenderFn}
        />
    );

    ReactDOM.render(finalComponent, node);
}

export default function renderAsync({ history, routes, ...rest }, node) {
    match({ history, routes }, (error, redirectLocation, renderProps) => {
        renderSync({
            ...rest,
            renderProps,
        }, node);
    });
}
