import { combineReducers } from 'redux';

import userReducer from './userReducer';
import groupReducer from './groupReducer';
import memberReducer from './memberReducer';
import messageListReducer from './messageListReducer';

const rootReducer = combineReducers({
  userReducer,
  groupReducer,
  memberReducer,
  messageListReducer
});

export default rootReducer;
