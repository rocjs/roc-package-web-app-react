import React from 'react';

import StockEventListView from '../stock-event-list';
import StockGraphListView from '../stock-graph-list';
import styles from './style.css';

export default class StockView extends React.Component {
    static propTypes = {
        data: React.PropTypes.object.isRequired
    };

    static defaultProps = {
        data: {
            graphs: {},
            events: []
        }
    };

    render() {
        return (
            <div className={styles.stock}>
                <StockGraphListView graphs={this.props.data.graphs}/>
                <StockEventListView events={this.props.data.events}/>
            </div>
        );
    }
}
