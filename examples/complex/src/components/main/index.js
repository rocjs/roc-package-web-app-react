import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';

// components
import Repo from '../repo';
import Clicker from '../clicker';
import Bacon from '../bacon';
import Errors from '../errors';

import { createFetchAction } from 'redux-fetcher'
import { updateUser }  from '../../reducers/repouser';

// roc error action
import { resetErrors } from './actions';

// clicker reducer
import { click } from '../../reducers/clicker';

// util
import { prefetchRepos, mergeReposProps } from './util';

import styles from './style.css';
import logo from './logo.png';

// this maps values from redux store to props of this component
function mapStateToProps(state) {
    return {
        clicker: state.clicker,
        repoUser: state.repoUser,
        repositories: state.repositories,
        errors: state.errors
    };
}

// this maps action creators to dispatch, available as props on component
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ click, resetErrors, createFetchAction, updateUser }, dispatch);
}

// fetch triggers on both server and client
@provideHooks({ fetch: prefetchRepos })
// mergeReposProps enriches dispatch props with reposForceFetch
@connect(mapStateToProps, mapDispatchToProps, mergeReposProps)
export default class Main extends React.Component {
    static propTypes = {
        // bound actions
        click: React.PropTypes.func.isRequired,
        resetErrors: React.PropTypes.func.isRequired,
        createFetchAction: React.PropTypes.func.isRequired,
        reposForceFetch: React.PropTypes.func.isRequired,
        updateUser: React.PropTypes.func.isRequired,
        repoUser: React.PropTypes.string,
        // connected values from store
        clicker: React.PropTypes.number,
        repositories: React.PropTypes.object,
        errors: React.PropTypes.array
    };

    render() {
        return (
            <div className={ styles.main }>
                <img src={ logo } className={ styles.logo }/>

                <Errors errors={ this.props.errors } resetErrors= { this.props.resetErrors }/>
                <Clicker className={ styles.clicker } clicker={ this.props.clicker } click={ this.props.click }/>

                <Repo
                    { ...this.props.repositories }
                    repoUser = { this.props.repoUser }
                    reposForceFetch = { this.props.reposForceFetch }
                    updateUser = { this.props.updateUser }
                />
                <Bacon/>
            </div>
        );
    }
}
