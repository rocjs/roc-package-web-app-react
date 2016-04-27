import React from 'react';
import { RouterContext } from 'react-router';
import { trigger } from 'redial';

import getRoutesProps from '../../shared/get-routes-props';
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

        const routeProps = getRoutesProps(nextProps.routes);

        const fetchComponents = this.filterAndFlattenComponents(nextProps.components, '__redial_handlers__', 'fetch');
        if (fetchComponents.length > 0) {
            this.loadData(fetchComponents, nextProps.params, nextProps.location, routeProps);
        } else {
            this.setState({
                loading: false,
                prevProps: null
            });
        }

        const deferComponents = this.filterAndFlattenComponents(nextProps.components, '__redial_handlers__', 'defer');
        if (deferComponents.length > 0) {
            this.loadDataDefered(deferComponents, nextProps.params, nextProps.location, routeProps);
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

    filterAndFlattenComponents(components, staticMethod, name) {
        return components.filter((component) => !!component[staticMethod] && component[staticMethod][name]);
    }

    loadDataDefered(components, params, location, routeProps) {
        // Get deferred data, will not block route transitions
        trigger('defer', components, {
            location,
            params,
            dispatch: this.props.store.dispatch,
            getState: this.props.store.getState,
            routeProps
        }).catch((err) => {
            if (process.env.NODE_ENV !== 'production') {
                console.error('There was an error when fetching data: ', err);
            }
        });
    }

    loadData(components, params, location, routeProps) {
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

        trigger('fetch', components, {
            location,
            params,
            dispatch: this.props.store.dispatch,
            getState: this.props.store.getState,
            routeProps
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
        return <RouterContext {...props} createElement={ this.createElement } />;
    }
}
