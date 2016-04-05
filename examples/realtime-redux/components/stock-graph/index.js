import React from 'react';
import { Line as LineChart } from 'react-chartjs';

import styles from './style.css';

export default class StockGraphView extends React.Component {
    static propTypes = {
        points: React.PropTypes.number.isRequired,
        data: React.PropTypes.object.isRequired
    };

    static defaultProps = {
        points: 15,
        data: {
            LONG_NAME: 'Loading...',
            TICKER: 'Loading...',
            LAST: '-',
            CHANGE: '-',
            times: [],
            index: []
        }
    };

	render() {
        const header = `${this.props.data.LONG_NAME} (${this.props.data.TICKER})`;
        const chart = livePresentationView(this.props);

        return (
            <div className={styles.graph}>
                <h2>{ header }</h2>
                Nå: {this.props.data.LAST}<br/>
                Endring: {this.props.data.CHANGE}<br/>
				{ chart }
            </div>
        );
    }
}

const calculateChartData = (props) => {
    return {
        labels: props.data.times,
        datasets: [
            {
                label: 'Main Index',
                fillColor: 'rgba(151,187,205,0.2)',
                strokeColor: 'rgba(151,187,205,1)',
                pointColor: 'rgba(151,187,205,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(151,187,205,1)',
                data: props.data.index
            }
        ]
    };
};

const plotDataCollectComplete = (props) => props.data.index.length >= props.points;
const plotDataCollectProgress = (props) => Math.floor(props.data.index.length / props.points * 100) + '%';

const graphView = (props) => React.createElement(LineChart, { data: calculateChartData(props), width: 500 });
const progressView = (props) => React.createElement('h3', null, 'Collecting Data: ' + plotDataCollectProgress(props));
const livePresentationView = (props) => plotDataCollectComplete(props) ? graphView(props) : progressView(props);
