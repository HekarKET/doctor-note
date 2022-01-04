import jwtDecode from "jwt-decode";
import { loginUserApi, registerUserApi, updateUserApi } from "../../util/api";
import { catchError } from "../../util/util";
import {
  FETCH_USER,
  LOGIN_USER,
  REGISTER_USER,
  UPDATE_USER,
} from "../constants/constant";

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
      success: false,
    });
    loginUserApi(data)
      .then((res) => {
        if (res.status === 200) {
          let user = jwtDecode(res.data.token);
          // console.log({ user });
          if (typeof window !== "undefined") {
            localStorage.setItem("user", res.data.token);
          }
          dispatch({
            type: LOGIN_USER,
            payload: user,
            loading: false,
            error: false,
            success: true,
          });
        } else {
          dispatch({
            type: LOGIN_USER,
            payload: {},
            loading: false,
            error: false,
            success: false,
          });
        }
      })
      .catch((err) =>
        dispatch({
          type: LOGIN_USER,
          payload: {},
          loading: false,
          error: true,
          success: false,
        })
      );
  };
};

export const registerUserAction = (data) => {
  return function (dispatch) {
    dispatch({
      type: REGISTER_USER,
      payload: {},
      loading: true,
      error: false,
      success: false,
    });
    registerUserApi(data)
      .then((res) => {
        if (res.status === 200) {
          let user = jwtDecode(res.data.token);
          // console.log({ user });
          if (typeof window !== "undefined") {
            localStorage.setItem("user", res.data.token);
          }
          dispatch({
            type: REGISTER_USER,
            payload: user,
            loading: false,
            error: false,
            success: true,
          });
        }
      })
      .catch((err, data) => {
        // catchError(err);
        dispatch({
          type: REGISTER_USER,
          payload: {},
          loading: false,
          error: true,
          success: false,
          message: err.response.data.message,
        });
      });
  };
};

export const updateUserAction = (data) => {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER,
      payload: data,
      loading: true,
      error: false,
      success: false,
    });

    updateUserApi(data)
      .then((res) => res.data)
      .then((data) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("user", data.token);
        }
        let user = jwtDecode(data.token);
        dispatch({
          type: UPDATE_USER,
          payload: user,
          loading: false,
          error: false,
          success: true,
        });
      })
      .catch((err) => {
        catchError(err);
        dispatch({
          type: UPDATE_USER,
          // payload: user,
          loading: false,
          error: true,
          success: false,
          message: err.response.data.message,
        });
      });
  };
};
