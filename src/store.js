import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';

import userReducer from './reducers/userReducer';
const middleware = [];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

export default createStore(userReducer, composeWithDevTools(applyMiddleware(...middleware)));
