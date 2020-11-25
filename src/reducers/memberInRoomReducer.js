import {
  JOIN_ROOM,
  LEAVE_ROOM
} from '../constants/actionTypes';

const memberInRoomReducer = (state = {}, action) => {
  switch (action.type) {
    case JOIN_ROOM:
      console.log("REDUX", state);
      console.log("REDUX", action.payload);
      return { ...state, ...action.payload };

    case LEAVE_ROOM:
      return delete state[action.payload];

    default:
      return state;
  }
};

export default memberInRoomReducer;
