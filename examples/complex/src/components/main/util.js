import { createFetchAction } from 'redux-fetcher';
import { FETCH_REPOS } from '../../reducers/repofetch';

const userUrl = (user) => `https://api.github.com/users/${user}/repos`;

// compatible with redial '@provideHooks'-fetch
export function prefetchRepos({ dispatch, getState }) {
    // read the repository source URL from state
    const user = getState().repoUser;

    // createFetchAction creates a redux action for us that will trigger
    // respective types WEATHER_FETCH_SUCCESS, WEATHER_FETCH_PENDING or WEATHER_FETCH_FAILURE.
    const reposAction = createFetchAction(FETCH_REPOS, userUrl(user));

    // dispatch the action
    return dispatch(reposAction);
}

// compatible with react-redux third param 'mergeProps'
export function mergeReposProps(stateProps, dispatchProps, ownProps) {
    // enrich dispatch props with a repos forced fetch, typically used for buttons
    const newDispatchProps = {
        ...dispatchProps,
        reposForceFetch: () => dispatchProps.createFetchAction.bind(
            undefined,
            FETCH_REPOS,
            userUrl(stateProps.repoUser),
            { force: true, method: 'GET' }
        )
    };

    return Object.assign({}, ownProps, stateProps, newDispatchProps);
}
