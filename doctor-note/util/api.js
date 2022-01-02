import axios from "axios";

const api = axios.create("http://localhost:3005/");

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("verify");
    config.headers = { token: token };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const fetchSingleUseApi = api.get();
