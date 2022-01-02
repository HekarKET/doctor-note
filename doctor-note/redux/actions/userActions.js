import { FETCH_USER } from "../constants/constant";

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
