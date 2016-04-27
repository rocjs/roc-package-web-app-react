/* global ROC_PATH */

import React from 'react';
import Helmet from 'react-helmet';

import { rocConfig } from './universal-config';

export default class Header extends React.Component {
    render() {
        const path = ROC_PATH !== '/' ? ROC_PATH + '/' : null;
        const base = rocConfig.runtime.base.href && path ? {
            ...rocConfig.runtime.base,
            href: rocConfig.runtime.base.href.replace(/ROC_PATH/, path)
        } : {};

        return (
            <Helmet
                htmlAttributes={ rocConfig.runtime.htmlAttributes }
                defaultTitle={ rocConfig.runtime.applicationName }
                titleTemplate={ rocConfig.runtime.applicationNameTemplate }
                meta={ rocConfig.runtime.meta }
                link={ rocConfig.runtime.link }
                base={ base }
                script={ rocConfig.runtime.script }
                style={ rocConfig.runtime.style }
            />
        );
    }
}
