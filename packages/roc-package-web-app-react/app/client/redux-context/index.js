import React from 'react';
import RoutingContext from 'react-router/lib/RoutingContext';
import { getPrefetchedData, getDeferredData } from 'react-fetcher';

import ReduxContextContainer from './redux-context-container';

export default class ReduxContext extends React.Component {

    static childContextTypes = {
        reduxContext: React.PropTypes.object
    };

    static propTypes = {
        components: React.PropTypes.array.isRequired,
        params: React.PropTypes.object.isRequired,
        location: React.PropTypes.object.isRequired,
        store: React.PropTypes.object.isRequired,
        blocking: React.PropTypes.bool,
        initalClientLoading: React.PropTypes.func
    };

    static defaultProps = {
        blocking: false
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false,
            prevProps: null,
            inital: true && this.props.blocking
        };
    }

    getChildContext() {
        const { loading } = this.state;
        return {
            reduxContext: {
                loading
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        const routeChanged = nextProps.location !== this.props.location;
        if (!routeChanged) {
            return;
        }

        const newComponents = this.filterAndFlattenComponents(nextProps.components, 'fetchers');
        if (newComponents.length > 0) {
            this.loadData(newComponents, nextProps.params, nextProps.location);
        } else {
            this.setState({
                loading: false,
                prevProps: null
            });
        }

        const newComponentsDefered = this.filterAndFlattenComponents(nextProps.components, 'deferredFetchers');
        if (newComponentsDefered.length > 0) {
            this.loadDataDefered(newComponentsDefered, nextProps.params, nextProps.location);
        }
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    createElement(Component, props) {
        return (
            <ReduxContextContainer Component={Component} routerProps={props}/>
        );
    }

    filterAndFlattenComponents(components, staticMethod) {
        return components.filter((component) => !!component[staticMethod]);
    }

    loadDataDefered(components, params, location) {
        // Get deferred data, will not block route transitions
        getDeferredData(components, {
            location,
            params,
            dispatch: this.props.store.dispatch,
            getState: this.props.store.getState
        }).catch((err) => {
            if (process.env.NODE_ENV !== 'production') {
                console.error('There was an error when fetching data: ', err);
            }
        });
    }

    loadData(components, params, location) {
        const completeRouteTransition = () => {
            const sameLocation = this.props.location === location;

            if (sameLocation && !this.unmounted) {
                this.setState({
                    loading: false,
                    prevProps: null,
                    inital: false
                });
            }
        };

        if (this.props.blocking) {
            this.setState({
                loading: true,
                prevProps: this.props
            });
        }

        getPrefetchedData(components, {
            location,
            params,
            dispatch: this.props.store.dispatch,
            getState: this.props.store.getState
        }).then(() => {
            completeRouteTransition();
        }).catch((err) => {
            if (process.env.NODE_ENV !== 'production') {
                console.error('There was an error when fetching data: ', err);
            }

            completeRouteTransition();
        });
    }

    render() {
        if (this.props.initalClientLoading && this.state.inital) {
            return <this.props.initalClientLoading />;
        }

        const props = this.state.loading ? this.state.prevProps : this.props;
        return <RoutingContext {...props} createElement={ this.createElement } />;
    }
}
