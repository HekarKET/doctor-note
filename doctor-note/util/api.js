import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3005/" });

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("user");
    config.headers.token = token;
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

// export const fetchSingleUseApi = api.get();
export const loginUserApi = (data) => api.post("/auth/login", data);
export const registerUserApi = (data) => api.post("/auth/register", data);
export const updateUserApi = (data) => api.post("/auth/update", data);



export const fetchPatientsApi = (data, count) => api.post("/patient/doctor", data, { headers: { page: count } });
export const fetchPatientsNameApi = (data) => api.post("/patient/name", data);
export const addPatientApi = (data) => api.post("/patient/add", data);
export const addTreatmentApi = (data) => api.post("/patient/add/diagnosis", data);
export const deletePatientTreatmentApi = (data, count) => api.post("/patient/delete/diagnosis", data);
export const updatePatientTreatmentApi = (data, count) => api.post("/patient/update/diagnosis", data);




/* {{url}}/patient/delete/diagnosis */