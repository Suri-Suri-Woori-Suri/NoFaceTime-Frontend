import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';

import { userReducer, memberInRoomReducer, messageListReducer } from './reducers/userReducer';

const rootReducer = combineReducers({
  userReducer,
  memberInRoomReducer,
  messageListReducer
});

const middleware = [];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));
