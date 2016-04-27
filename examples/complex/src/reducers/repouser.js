const UPDATE_REPO_USER = 'UPDATE_REPO_USER';

export default function reducer(state = 'rocjs', action = {}) {
    if (action.type === UPDATE_REPO_USER) {
        return action.user;
    }
    return state;
}

export function updateUser(user) {
    return {
        type: UPDATE_REPO_USER,
        user
    };
}
