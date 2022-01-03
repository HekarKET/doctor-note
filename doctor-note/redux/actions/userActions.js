import jwtDecode from "jwt-decode";
import { loginUserApi } from "../../util/api";
import { FETCH_USER, LOGIN_USER } from "../constants/constant";

export const fetchSingleUserAction = () => {
  return function (dispatch) {
    dispatch({
      type: FETCH_USER,
      payload: "akhilesh",
      loading: false,
      error: false,
    });
  };
};

export const loginUserAction = (data) => {
  return function (dispatch) {
    dispatch({
      type: LOGIN_USER,
      payload: {},
      loading: true,
      error: false,
    });
    loginUserApi(data)
      .then((res) => res.data)
      .then((data) =>
        dispatch({
          type: LOGIN_USER,
          payload: jwtDecode(data.token),
          loading: false,
          error: false,
        })
      )
      .catch((err) =>
        dispatch({
          type: LOGIN_USER,
          payload: {},
          loading: false,
          error: true,
        })
      );
  };
};
