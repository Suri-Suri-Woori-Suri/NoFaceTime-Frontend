import {
  ADD_MESSAGE,
  ADD_SECRET_MESSAGE
} from '../constants/actionTypes';

const messageListReducer = (state = { public: [], secret: [] }, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return { ...state, public: [...state.public, action.payload] };
    case ADD_SECRET_MESSAGE:
      return { ...state, secret: [...state.secret, action.payload] };
    default:
      return state;
  }
};

export default messageListReducer;
