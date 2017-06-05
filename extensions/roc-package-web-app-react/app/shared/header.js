/* global ROC_PATH */

import React from 'react';
import Helmet from 'react-helmet';

import { rocConfig } from './universal-config';

// eslint-disable-next-line
export default class Header extends React.Component {
    render() {
        const path = ROC_PATH === '/' ? '' : ROC_PATH + '/'; // eslint-disable-line
        const base = rocConfig.runtime.head.base.href ? {
            ...rocConfig.runtime.head.base,
            href: rocConfig.runtime.head.base.href.replace(/^ROC_PATH$/, path),
        } : {};

        return (
            <Helmet
                {
                    ...{
                        defaultTitle: rocConfig.runtime.applicationName,
                        ...rocConfig.runtime.head,
                        base,
                    }
                }
            />
        );
    }
}
