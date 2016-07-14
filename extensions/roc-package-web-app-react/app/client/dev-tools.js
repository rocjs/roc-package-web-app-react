import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import { rocConfig } from '../shared/universal-config';

export default createDevTools(
    <DockMonitor { ...rocConfig.dev.redux.devTools.dockMonitor }>
        <LogMonitor { ...rocConfig.dev.redux.devTools.logMonitor } />
    </DockMonitor>
);
