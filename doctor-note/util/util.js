import { useSelector } from "react-redux";

export const isEmpty = (obj) => {
  for (var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
};

export const catchError = (err) => {
  if (err.response) {
    if (err.response.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    }
  }
};

export const isAuth = () => {
  const userReducer = useSelector((state) => state.userReducer);
  // console.log({userReducer});
  return !isEmpty(userReducer.user);
};
