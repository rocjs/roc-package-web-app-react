import React, { Component } from 'react';

import styles from './style.css';

export default class ErrorItem extends Component {
    static defaultProps = {
        key: 0,
        error: ''
    };

    static propTypes = {
        key: React.PropTypes.number.isRequired,
        error: React.PropTypes.string.isRequired
    };

    render() {
        return (
            <div key={ this.props.key } className={styles.error}>
                <h2>Error</h2>
                <p>{ this.props.error }</p>
            </div>
        );
    }
}
