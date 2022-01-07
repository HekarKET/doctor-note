import {
  addPatientApi,
  deletePatientTreatmentApi,
  fetchPatientsApi,
  fetchPatientsNameApi,
} from "../../util/api";
import { catchError } from "../../util/util";
import {
  ADD_PATIENT,
  DELETE_PATIENT_TREATMENT,
  FETCH_PATIENTS,
  FETCH_PATIENT_NAMES,
} from "../constants/constant";

export const fetchPatientAction = (data, count) => {
  return function (dispatch) {
    dispatch({
      type: FETCH_PATIENTS,
      error: false,
      loading: true,
      sucesss: false,
      action: "FETCH_PATIENTS",
    });

    fetchPatientsApi(data, count)
      .then((res) => res.data)
      .then((data) =>
        dispatch({
          type: FETCH_PATIENTS,
          error: false,
          loading: false,
          sucesss: true,
          action: "FETCH_PATIENTS",
          patients: data.patients,
          currentPatient:
            data.patients && data.patients.length !== 0 ? data.patients[0] : {},
          total: data.total ? data.total : -1,
        })
      )
      .catch((err) => {
        catchError(err);
        dispatch({
          type: FETCH_PATIENTS,
          error: true,
          loading: false,
          sucesss: false,
          action: "FETCH_PATIENTS",
          patients: [],
          currentPatient: {},
          total: -1,
        });
      });
  };
};

export const deletPatientDetailsAction = (data) => {
  return function (dispatch, getStore) {
    dispatch({
      type: DELETE_PATIENT_TREATMENT,
      error: false,
      loading: true,
      sucesss: false,
      action: "DELETE_PATIENT_TREATMENT",
    });

    deletePatientTreatmentApi(data)
      .then((res) => res.data)
      .then((resData) => {
        let patients = getStore().patientReducer.patients;
        let patient = patients.filter(
          (item) => item.history._id !== data.diagnosis_id
        );
        dispatch({
          type: DELETE_PATIENT_TREATMENT,
          error: false,
          loading: false,
          sucesss: true,
          action: "DELETE_PATIENT_TREATMENT",
          patients: patient,
          currentPatient:
            patient.patients && patient.patients.length !== 0
              ? patient.patients[0]
              : {},
        });
      })
      .catch((err) => {
        catchError(err);
        dispatch({
          type: DELETE_PATIENT_TREATMENT,
          error: true,
          loading: false,
          action: "DELETE_PATIENT_TREATMENT",
          sucesss: false,
          message: err.response.message,
        });
      });
  };
};

export const fetchPatientNamesAction = (id) => {
  return function (dispatch) {
    dispatch({
      type: FETCH_PATIENT_NAMES,
      error: false,
      loading: true,
      sucesss: false,
      action: "FETCH_PATIENT_NAMES",
    });
    fetchPatientsNameApi(id)
      .then((res) => res.data)
      .then((data) => {
        dispatch({
          type: FETCH_PATIENT_NAMES,
          error: false,
          loading: false,
          sucesss: true,
          patientNames: data,
          action: "FETCH_PATIENT_NAMES",
        });
      })
      .catch((err) => {
        catchError(err);
        dispatch({
          type: FETCH_PATIENT_NAMES,
          error: true,
          loading: false,
          sucesss: false,
          action: "FETCH_PATIENT_NAMES",
        });
      });
  };
};

export const addPatientAction = (data) => {
  return function (dispatch, getStore) {
    dispatch({
      type: ADD_PATIENT,
      error: false,
      loading: true,
      sucesss: false,
    });

    addPatientApi(data)
      .then((res) => res.data)
      .then((data) => {
        let patients = getStore().patientReducer.patientNames;

         patients.push({
          patientName: data.data.patientName,
          _id: data.data._id,
        });

        dispatch({
          type: ADD_PATIENT,
          error: false,
          loading: false,
          sucesss: true,
          patientNames: patients,
        });
      })
      .catch((err) => {
        catchError(err);
        dispatch({
          type: ADD_PATIENT,
          error: true,
          loading: false,
          sucesss: false,
        });
      });
  };
};
