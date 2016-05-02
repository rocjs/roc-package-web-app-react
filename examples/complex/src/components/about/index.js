import React, { Component } from 'react';
import { provideHooks } from 'redial';

@provideHooks({
    fetch: (locals) => new Promise((resolve) => {
        if (locals.force || !locals.getProps()) {
            setTimeout(() => {
                locals.setProps({color: 'blue'});
                resolve();
            }, 2500);
        } else {
            resolve();
        }
    }),
    defer: (locals) => {
        locals.setProps({color: 'red'});
    },
})
export default class About extends Component {
    render() {
        // "Remove" props that are different on the server and the client - only structure from JSON.stringify
        const { location, routes, route, ...props } = this.props;

        return (
            <div>
                <h1 style={{color: this.props.color}}>About us</h1>
                <button onClick={ () => this.props.reload() }>Reload</button>
                <pre>{ JSON.stringify(props, null, 2) }</pre>
            </div>
        );
    }
}
