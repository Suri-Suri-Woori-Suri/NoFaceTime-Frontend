import {
  JOIN_ROOM,
  LEAVE_ROOM
} from '../constants/actionTypes';

const memberInRoomReducer = (state = {}, action) => {
  switch (action.type) {
    case JOIN_ROOM:
      return { ...state, ...action.payload };

    case LEAVE_ROOM:
      const newState = {};

      for (const socketId in state) {
        if (socketId !== action.payload) {
          newState[socketId] = state[socketId];
        }
      }

      return newState;

    default:
      return state;
  }
};

export default memberInRoomReducer;
