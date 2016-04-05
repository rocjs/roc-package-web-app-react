import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import { rocConfig } from '../shared/universal-config';

export default createDevTools(
    <DockMonitor
        defaultPosition={rocConfig.dev.reduxDevtools.position}
        defaultSize={rocConfig.dev.reduxDevtools.size}
        toggleVisibilityKey={rocConfig.dev.reduxDevtools.visibilityKey}
        changePositionKey={rocConfig.dev.reduxDevtools.positionKey}
        defaultIsVisible={rocConfig.dev.reduxDevtools.defaultVisible}
    >
        <LogMonitor theme={rocConfig.dev.reduxDevtools.theme} />
    </DockMonitor>
);
