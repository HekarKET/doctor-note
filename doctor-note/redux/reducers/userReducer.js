import { FETCH_USER, LOGIN_USER, REGISTER_USER, UPDATE_USER } from "../constants/constant";
import jwtDecode from "jwt-decode";

const handleInitialState = () => {
  let user = null;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("user");
  }
  if (user !== null) {
    user = jwtDecode(user);
    // console.log(user===true);
  } else {
    user = {};
  }
  return user;
};

const intialState = {
  user: handleInitialState(),
  loading: true,
  success: false,
  error: false,
};

export function userReducer(state = intialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        user: action.payload,
        loading: action.loading,
        error: action.error,
        success: action.success,
      };

    case LOGIN_USER:
      return {
        user: action.payload,
        loading: action.loading,
        error: action.error,
        success: action.success,
      };

    case REGISTER_USER:
      return {
        user: action.payload,
        loading: action.loading,
        error: action.error,
        success: action.success,
        message: action.message
      };
      case UPDATE_USER:
        return {
          user: action.payload,
          loading: action.loading,
          error: action.error,
          success: action.success,
          message: action.message
        };
        3
    default:
      return state;
  }
}
