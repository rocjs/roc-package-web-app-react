import { createFetchReducer } from 'redux-fetcher';

export const FETCH_REPOS = 'repositories';
export default createFetchReducer(FETCH_REPOS);
