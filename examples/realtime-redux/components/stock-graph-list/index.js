import React from 'react';

import styles from './style.css';
import StockGraphView from '../stock-graph';

export default class StockGraphList extends React.Component {
    static propTypes = {
        graphs: React.PropTypes.object.isRequired
    };

    static defaultProps = {
        graphs: {}
    };

    render() {
        const graphs = Object.keys(this.props.graphs).map((e) => {
            const graph = this.props.graphs[e];
            return <StockGraphView key={graph.TICKER} data={graph}/>;
        });

        return (
            <div className={styles.graphs}>
                <h1>SSE Graphed Events</h1>
                { graphs }
            </div>
        );
    }
}
