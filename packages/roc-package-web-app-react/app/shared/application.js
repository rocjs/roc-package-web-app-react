import React from 'react';

import Header from './header';

export default class Application extends React.Component {

    static propTypes = {
        children: React.PropTypes.node
    };

    render() {
        return (
            <div>
                <Header />
                { this.props.children }
            </div>
        );
    }
}
