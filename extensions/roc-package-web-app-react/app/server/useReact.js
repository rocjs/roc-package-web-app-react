/* global __DIST__, __DEV__ HAS_TEMPLATE_VALUES, TEMPLATE_VALUES, ROC_PATH, HAS_REDUX_SAGA, REDUX_SAGAS */

import useReactLib from 'roc-package-web-app-react/lib/app/server/useReact';

import Header from '../shared/header';

export default function useReact(createServer) {
    // eslint-disable-next-line
    const templateValues = HAS_TEMPLATE_VALUES ? require(TEMPLATE_VALUES) : undefined;
    let reduxSagas;

    if (HAS_REDUX_SAGA) {
        reduxSagas = require(REDUX_SAGAS).default; // eslint-disable-line
    }

    return useReactLib(createServer, {
        dev: __DEV__,
        dist: __DIST__,
        hasTemplateValues: HAS_TEMPLATE_VALUES,
        templateValues,
        rocPath: ROC_PATH,
        Header,
        reduxSagas,
    });
}
