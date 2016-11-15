/* global __DIST__, __DEV__ HAS_TEMPLATE_VALUES, TEMPLATE_VALUES, ROC_PATH, HAS_REDUX_SAGA, REDUX_SAGAS,
 I18N_LOCALES, USE_I18N_POLYFILL */

import useReactLib from 'roc-package-web-app-react/lib/app/server/useReact';

import Header from '../shared/header';
import getRoutesAndStore from '../default/get-routes-and-store';

const { store, routes } = getRoutesAndStore();

export default function useReact(createServer) {
    // eslint-disable-next-line
    const templateValues = HAS_TEMPLATE_VALUES ? require(TEMPLATE_VALUES) : undefined;
    let reduxSagas;

    if (HAS_REDUX_SAGA) {
        reduxSagas = require(REDUX_SAGAS).default; // eslint-disable-line
    }

    if (USE_I18N_POLYFILL) {
        // eslint-disable-next-line
        const areIntlLocalesSupported = require('intl-locales-supported');

        if (!areIntlLocalesSupported(I18N_LOCALES)) {
            // eslint-disable-next-line
            const IntlPolyfill = require('intl');

            Intl.NumberFormat = IntlPolyfill.NumberFormat;
            Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
        }
    }

    return ({ createRoutes = routes, createStore = store, ...rest } = {}) => useReactLib(createServer, {
        dev: __DEV__,
        dist: __DIST__,
        hasTemplateValues: HAS_TEMPLATE_VALUES,
        templateValues,
        rocPath: ROC_PATH,
        Header,
        reduxSagas,
    })({
        createRoutes,
        createStore,
        ...rest,
    });
}
