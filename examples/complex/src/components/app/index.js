import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';

export default class App extends Component {
    static propTypes = {
        children: React.PropTypes.object
    };

    render() {
        return (
            <div>
                <nav>
                    <ul>
                        <li><IndexLink to="/">Home</IndexLink></li>
                        <li><Link to="/about/">About</Link></li>
                    </ul>
                </nav>
                { this.props.children }
            </div>
        );
    }
}
