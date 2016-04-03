import React from 'react';
import Helmet from 'react-helmet';

import { rocConfig } from './universal-config';

export default class Header extends React.Component {
    render() {
        const path = rocConfig.runtime.path !== '/' ? rocConfig.runtime.path + '/' : rocConfig.runtime.path;
        const base = rocConfig.runtime.base.href ? {
            ...rocConfig.runtime.base,
            href: rocConfig.runtime.base.href.replace(new RegExp(rocConfig.runtime.path), path)
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
