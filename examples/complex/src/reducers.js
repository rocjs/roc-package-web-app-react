import { createFetchReducer } from 'redux-fetcher';

import { FETCH_WEATHER  } from './fetch';
export clicker from './reducers/clicker';
export const weather = createFetchReducer(FETCH_WEATHER);
