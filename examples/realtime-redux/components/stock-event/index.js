import React from 'react';

import styles from './style.scss';

export default class StockEventView extends React.Component {
    static propTypes = {
        name: React.PropTypes.string.isRequired,
        current: React.PropTypes.number.isRequired,
        diff: React.PropTypes.number.isRequired
    };

    static defaultProps = {
        name: '',
        current: 0,
        diff: 0
    };

    render() {
        const diffClass = this.props.diff < 0 ? styles.down : styles.up;

        return (
            <div className={styles.event}>
                <div className={styles.name}>
                    { this.props.name }
                </div>
                <div className="current">
                    { this.props.current }
                </div>
                <div className={diffClass}>
                    { this.props.diff }
                </div>
            </div>
        );
    }
}
