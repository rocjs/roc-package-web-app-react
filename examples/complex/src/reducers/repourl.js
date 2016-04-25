const UPDATE_REPO_URL = 'UPDATE_REPO_URL';

export default function reducer(state = 'https://api.github.com/orgs/rocjs/repos', action = {}) {
    if (action.type === UPDATE_REPO_URL) {
        return action.url;
    }
    return state;
}

export function updateRepoUrl(url) {
    return {
        type: UPDATE_REPO_URL,
        url
    };
}
