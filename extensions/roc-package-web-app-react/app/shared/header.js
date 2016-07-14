/* global ROC_PATH */

import React from 'react';
import Helmet from 'react-helmet';

import { rocConfig } from './universal-config';

export default class Header extends React.Component {
    render() {
        const path = ROC_PATH !== '/' ? ROC_PATH + '/' : ROC_PATH;
        const base = rocConfig.runtime.head.base.href && path ? {
            ...rocConfig.runtime.head.base,
            href: rocConfig.runtime.head.base.href.replace(/ROC_PATH/, path),
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
