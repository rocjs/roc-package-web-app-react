/* global ROC_PATH */

import { createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

export default function setupForRender(createStore, url) {
    const basename = ROC_PATH === '/' ? '' : ROC_PATH;

    const completeUrl = basename + url;
    const memoryHistory = createMemoryHistory({
        entries: [completeUrl],
        basename,
    });

    const store = createStore ? createStore(memoryHistory) : null;
    const history = store ? syncHistoryWithStore(memoryHistory, store) : memoryHistory;

    return {
        store,
        history,
        url,
    };
}
