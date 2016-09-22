/* global ROC_PATH */

import { createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

export default function setupForRender(createStore, url, rocPath) {
    const basename = rocPath === '/' ? '' : rocPath;

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
