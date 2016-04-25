import React, { Component } from 'react';
import { provideHooks } from 'redial';

@provideHooks({ fetch: () => new Promise((resolve) => {
    setTimeout(() => {
        console.log('Completed!');
        resolve();
    }, 2000);
})})
export default class About extends Component {
    render() {
        return (
            <div>
                <h1>About us</h1>
            </div>
        );
    }
}
