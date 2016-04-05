import React from 'react';

import styles from './style.css';
import StockEventView from '../stock-event';

export default class StockEventListView extends React.Component {
    static propTypes = {
        numToDisplay: React.PropTypes.number,
        events: React.PropTypes.array.isRequired
    };

    static defaultProps = {
        numToDisplay: 7,
        events: []
    };

    render() {
        const events = this.props.events.map((event) => {
            return (
                <StockEventView
                    key={event.key}
                    name={event.TICKER}
                    current={event.LAST}
                    diff={event.CHANGE}
                />
            );
        });

        return (
            <div className={styles.list}>
                { events }
             </div>
        );
    }
}
