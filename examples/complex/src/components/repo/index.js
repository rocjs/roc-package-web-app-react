import React, { Component } from 'react';

import styles from './style.css';

import { defaultReposUrl } from '../main/util';
import RepoLoader from './loader';
import RepoError from './error';
import RepoUpdateButton from './button';
import RepoData from './data';

export default class Repo extends Component {
    static propTypes = {
        payload: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
        loading: React.PropTypes.bool,
        endpoint: React.PropTypes.string,
        reposForceFetch: React.PropTypes.func,
        updateRepoUrl: React.PropTypes.func,
        repositoriesUrl: React.PropTypes.string,
        error: React.PropTypes.bool
    };

    render() {
        const error = this.props.error;
        const fetch = this.props.reposForceFetch(this.props.repositoriesUrl);

        const inputUrl = (
            <input
                ref="locationInput"
                type="text"
                defaultValue={ this.props.repositoriesUrl }
                onChange={ (e) => {
                        this.props.updateRepoUrl(e.target.value)
                    }
                }
            />
        );

        // an error occured
        if (error) {
            return (
                <div className={ styles.repos }>
                    { inputUrl }
                    <RepoUpdateButton
                        text="Try again, maybe errors were temporary"
                        onClick={ fetch }
                    />
                    <RepoError error={ this.props.payload.message }/>
                </div>
            );
        }

        // "hey man, we are loading your data" UI
        if (this.props.loading) {
            return (
                <RepoLoader endpoint={ this.props.meta.endpoint } />
            );
        }

        // "we got no data, and no error"
        if (!this.props.payload && !this.props.loading) {
            return (
                <div className={ styles.repos }>
                    { inputUrl }
                    <RepoUpdateButton
                        text="Try again, see if it provides data now"
                        onClick={ fetch }
                    />
                    No data provided
                </div>
            );
        }

        // present the fetched data
        return (
            <div className={ styles.repos }>
                { inputUrl }
                <RepoUpdateButton
                    text="Reload repos data"
                    onClick={ fetch }
                />
                <RepoData { ...this.props.payload }/>
            </div>
        );
    }
}
