import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';

import rootReducer from './reducers/rootReducer';

const middleware = [];

console.log("NODE ENV", process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));
