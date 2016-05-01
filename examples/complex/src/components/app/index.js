import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';

export default class App extends Component {
    static propTypes = {
        children: React.PropTypes.object
    };

    render() {
        const style = {
          opacity: this.props.loading ? 0.5 : 1,
          transition: this.props.loading ? 'opacity 250ms ease 300ms' : ''
        }
        return (
            <div style={style}>
                <nav>
                    <ul>
                        <li><IndexLink to="/">Home</IndexLink></li>
                        <li><Link to="/about/">About</Link></li>
                        <li><Link to="/simple/">Simple</Link></li>
                    </ul>
                </nav>
                { this.props.children }
            </div>
        );
    }
}
