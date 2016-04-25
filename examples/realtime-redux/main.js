import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';

import { appConfig } from 'roc-package-web-app-react/app/shared';

import { stockLoad, stockError } from './stock';
import * as rest from './util/rest';
import * as sse from './util/sse';
import StockView from './components/stock';
import styles from './style.scss';

function mapStateToProps(state) {
    return {
        data: state.stock.data,
        errors: state.stock.errors
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ stockLoad, stockError }, dispatch);
}

@provideHooks({ fetch: ({ dispatch }) => {
    const dataForServer = rest.fetchServerData();

    if (dataForServer) {
        return dataForServer
            .then(rest.getTickerData)
            .then(rest.createEventsFromTickerData)
            .then(rest.handleEvents(dispatch, stockLoad, stockError))
            .catch(rest.handleFetchDataError(dispatch, stockError));
    }
} })
@connect(mapStateToProps, mapDispatchToProps)
export default class Stock extends React.Component {
    static propTypes = {
        data: React.PropTypes.object.isRequired,
        errors: React.PropTypes.array,
        stockLoad: React.PropTypes.func.isRequired,
        stockError: React.PropTypes.func.isRequired
    };

    static defaultProps = {
        data: {},
        errors: []
    };

    // provides realtime datastream clientside
    componentDidMount() {
        this.sseSub = sse.subscribe(appConfig.sseSource, (stockEvent) => {
            const data = JSON.parse(stockEvent.data);
            this.props.stockLoad([data]);
        });
    }

    componentWillUnmount() {
        if (this.sseSub) {
            this.sseSub.close();
        }
    }

    render() {
        const errors = this.props.errors.map((error, key) => {
            return (
                <p key={key}>{error}</p>
            );
        });

        return (
            <div>
                <div className={styles.stock}>
                    { errors.length > 0 ? errors : <StockView data={this.props.data}/> }
                </div>
            </div>
        );
    }
}
