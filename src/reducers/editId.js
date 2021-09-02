import { SET_ID, REMOVE_ID } from "../constants/actionTypes";

const reducer = (state = null, action) => {
  switch (action.type) {
    case SET_ID:
      return action.payload;
    case REMOVE_ID:
      return null;
    default:
      return state;
  }
};

export default reducer;
