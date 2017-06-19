import React, { Component } from 'react';

import Bacon from '../bacon';

export default class Long extends Component {
    render() {
        return (
            <div>
                <Bacon />
                <Bacon />
                <Bacon />
            </div>
        );
    }
}
