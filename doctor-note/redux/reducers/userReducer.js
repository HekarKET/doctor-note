import { FETCH_USER, LOGIN_USER } from "../constants/constant";

const intialState = {
  user: {},
  loading: true,
  error: false,
};

export function userReducer(state = intialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        user: action.payload,
        loading: action.loading,
        error: action.error,
      };

    case LOGIN_USER:
      return {
        user: action.payload,
        loading: action.loading,
        error: action.error,
      };

    default:
      return state;
  }
}
