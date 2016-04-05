import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';

export default [thunk, apiMiddleware];
