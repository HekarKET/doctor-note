import jwtDecode from "jwt-decode";
import {
  fetchUserApi,
  loginUserApi,
  registerUserApi,
  updateUserApi,
} from "../../util/api";
import { catchError } from "../../util/util";
import {
  FETCH_USER,
  LOGIN_USER,
  REGISTER_USER,
  UPDATE_USER,
} from "../constants/constant";

export const fetchSingleUserAction = (data) => {
  return function (dispatch) {
    dispatch({
      type: FETCH_USER,
      success: false,
      loading: true,
      error: false,
      action: "FETCH_USER",
    });

    fetchUserApi(data)
      .then((res) => res.data)
      .then((data) => {
        let user = jwtDecode(data.token);
        if (typeof window !== "undefined") {
          localStorage.setItem("user", data.token);
        }
        dispatch({
          type: FETCH_USER,
          success: true,
          loading: false,
          error: false,
          payload: user,
          action: "FETCH_USER",
        });
      })
      .catch((err) => {
        catchError(err);
        dispatch({
          type: FETCH_USER,
          success: false,
          loading: false,
          error: true,
          action: "FETCH_USER",
        });
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
      action: "LOGIN_USER",
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
            action: "LOGIN_USER",
          });
        } else {
          dispatch({
            type: LOGIN_USER,
            payload: {},
            loading: false,
            error: false,
            success: false,
            action: "LOGIN_USER",
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
          action: "LOGIN_USER",
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
      action: "REGISTER_USER",
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
            action: "REGISTER_USER",
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
          action: "REGISTER_USER",
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
      action: "UPDATE_USER",
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
          action: "UPDATE_USER",
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
          action: "UPDATE_USER",
        });
      });
  };
};
