/* global ROC_PATH */

import React from 'react';
import Helmet from 'react-helmet';

import { rocConfig } from './universal-config';

export default class Header extends React.Component {
    render() {
        const path = ROC_PATH !== '/' ? ROC_PATH + '/' : ROC_PATH;
        const base = rocConfig.runtime.base.href ? {
            ...rocConfig.runtime.base,
            href: rocConfig.runtime.base.href.replace(/ROC_PATH/, path)
        } : {};

        return (
            <Helmet
                title={ rocConfig.runtime.applicationName }
                meta={ rocConfig.runtime.meta }
                link={ rocConfig.runtime.link }
                base={ base }
                script={ rocConfig.runtime.script }
            />
        );
    }
}
