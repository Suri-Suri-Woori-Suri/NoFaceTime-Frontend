import { SAVE_TARGET_GROUP_ID } from '../constants/actionTypes';

const groupReducer = (state = "", action) => {
  switch (action.type) {
    case SAVE_TARGET_GROUP_ID:
      return action.payload;

    default:
      return state;
  }
};

export default groupReducer;
