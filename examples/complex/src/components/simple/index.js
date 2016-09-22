import React, { Component } from 'react';

import Toggle from 'react-toggle';

import 'react-toggle/style.css?modules=false';

export default class Simple extends Component {

    constructor() {
        super();
        this.state = { enabled: false };
    }

    render() {
        return (
            <div>
                { this.state.enabled ? <h1>Something 🎉</h1> : <h1>Nothing ☹️</h1> }
                <label>
                    <Toggle
                        defaultChecked={this.state.enabled}
                        onChange={() => this.setState({ enabled: !this.state.enabled })} />
                    <span>Something?</span>
                </label>
            </div>
        );
    }
}
