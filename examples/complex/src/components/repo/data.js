import React, { Component } from 'react';

import styles from './style.css';

export default class RepoData extends Component {
    static propTypes = {
        city: React.PropTypes.object,
        list: React.PropTypes.array
    };

    render() {
        const repos = [];

        Object.keys(this.props).forEach((repo, i) => {
            const repoData = this.props[repo];

            repos.push(
                <div key={ i }>
                    <ul className={ styles.list }>
                        <li>
                            <h2>{ repoData.name }</h2>
                        </li>
                        <li>
                            Stargazers: { repoData.stargazers_count }
                        </li>
                        <li>
                            Open issues: { repoData.open_issues_count }
                        </li>
                    </ul>
                </div>
            );
        });

        return (
            <div>
                <h1>Fetched repo data</h1>
                <div className={ styles.data }>
                    { repos }
                </div>
            </div>
        );
    }
}
