import React, { Component } from 'react';

export default class Clicker extends Component {
    static propTypes = {
        clicker: React.PropTypes.number.isRequired,
        click: React.PropTypes.func.isRequired
    };

    render() {
        return (
            <div>
                <h1>Clicker</h1>
                <div>
                    { this.props.clicker } <button onClick={ this.props.click }>Click me!</button>
                </div>
            </div>
        );
    }
}
