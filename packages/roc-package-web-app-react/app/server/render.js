/* global __DIST__ __DEV__ */

import debug from 'debug';
import nunjucks from 'nunjucks';
import serialize from 'serialize-javascript';
import PrettyError from 'pretty-error';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import { trigger } from 'redial';
import { getAbsolutePath } from 'roc';
import ServerStatus from 'react-server-status';
import myPath from 'roc-package-web-app-react/lib/helpers/my-path';

import { rocConfig, appConfig } from '../shared/universal-config';
import Header from '../shared/header';
import getRoutesProps from '../shared/get-routes-props';

const pretty = new PrettyError();
const log = debug('roc:react-render');

export function initRenderPage({ script, css }) {
    const templatePath = rocConfig.runtime.template.path || `${myPath}/views`;
    nunjucks.configure(getAbsolutePath(templatePath), {
        watch: __DEV__
    });

    const bundleName = script[0];
    const styleName = css[0];

    return (
        head,
        content = '',
        fluxState = {}
    ) => {
        const { dev, build, ...rest } = rocConfig;

        const rocConfigClient = __DIST__ ? rest : {...rest, dev};

        // If we have no head we will generate it
        if (!head) {
            // Render to trigger React Helmet
            renderToStaticMarkup(<Header />);
            head = Helmet.rewind();
        }

        return nunjucks.render(rocConfig.runtime.template.name, {
            head,
            content,
            fluxState: serialize(fluxState),
            bundleName,
            styleName,
            dist: __DIST__,
            serializedRocConfig: serialize(rocConfigClient),
            serializedAppConfig: serialize(appConfig)
        });
    };
}

export function reactRender(url, history, store, createRoutes, renderPage, staticRender = false) {
    return new Promise((resolve) => {
        match({ history, routes: createRoutes(store), location: url },
            (error, redirect, renderProps) => {
                if (redirect) {
                    log(`Redirect request to ${redirect.pathname + redirect.search}`);
                    return resolve({
                        redirect: redirect.pathname + redirect.search
                    });
                } else if (error) {
                    log('Router error', pretty.render(error));
                    return resolve({
                        status: 500,
                        body: renderPage()
                    });
                } else if (!renderProps) {
                    log('No renderProps, most likely the path does not exist');
                    return resolve({
                        status: 404,
                        body: renderPage()
                    });
                }

                const components = renderProps.routes.map(route => route.component);

                let locals = {
                    location: renderProps.location,
                    params: renderProps.params,
                    routeProps: getRoutesProps(renderProps.routes)
                };

                if (store) {
                    locals = {
                        ...locals,
                        dispatch: store.dispatch,
                        getState: store.getState
                    };
                }

                trigger('fetch', components, locals)
                    .then(() => {
                        let component = <RouterContext {...renderProps} />;

                        if (store) {
                            component = (
                                <Provider store={ store }>
                                    { component }
                                </Provider>
                            );
                        }

                        const page = staticRender ? renderToStaticMarkup(component) : renderToString(component);
                        const head = Helmet.rewind();

                        const state = store ? store.getState() : {};

                        return resolve({
                            body: renderPage(head, page, state),
                            status: ServerStatus.rewind() || 200
                        });
                    })
                    .catch((err) => {
                        if (err) {
                            log('Fetching error', pretty.render(err));
                            return resolve({
                                status: 500,
                                body: renderPage()
                            });
                        }
                    });
            });
    });
}
