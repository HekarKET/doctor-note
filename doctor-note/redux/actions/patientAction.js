import {
  addPatientApi,
  addTreatmentApi,
  deletePatientTreatmentApi,
  fetchPatientsApi,
  fetchPatientsNameApi,
  updatePatientTreatmentApi,
} from "../../util/api";
import { catchError } from "../../util/util";
import {
  ADD_PATIENT,
  ADD_TREATMENT,
  DELETE_PATIENT_TREATMENT,
  FETCH_PATIENTS,
  FETCH_PATIENT_NAMES,
  UPDATE_PATIENT_TREATMENT,
} from "../constants/constant";

export const fetchPatientAction = (data, count) => {
  return function (dispatch) {
    dispatch({
      type: FETCH_PATIENTS,
      error: false,
      loading: true,
      sucess: false,
      action: "FETCH_PATIENTS",
    });

    fetchPatientsApi(data, count)
      .then((res) => res.data)
      .then((data) =>
        dispatch({
          type: FETCH_PATIENTS,
          error: false,
          loading: false,
          sucess: true,
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
          sucess: false,
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
      sucess: false,
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
          sucess: true,
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
          sucess: false,
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
      sucess: false,
      action: "FETCH_PATIENT_NAMES",
    });
    fetchPatientsNameApi(id)
      .then((res) => res.data)
      .then((data) => {
        dispatch({
          type: FETCH_PATIENT_NAMES,
          error: false,
          loading: false,
          sucess: true,
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
          sucess: false,
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
      sucess: false,
      action: "ADD_PATIENT",
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
          sucess: true,
          patientNames: patients,
          action: "ADD_PATIENT",
        });
      })
      .catch((err) => {
        catchError(err);
        dispatch({
          type: ADD_PATIENT,
          error: true,
          loading: false,
          sucess: false,
          action: "ADD_PATIENT",
          message: err.response.data.message,
        });
      });
  };
};

export const addTreatmentAction = (data) => {
  return function (dispatch) {
    //add dispatch to set loading true
    dispatch({
      type: ADD_TREATMENT,
      sucess: false,
      error: false,
      loading: true,
      action: "ADD_TREATMENT",
    });

    //call api with data
    addTreatmentApi(data)
      .then((res) => res.data)
      .then((data) => {
        //if success then dispatch success true

        dispatch({
          type: ADD_TREATMENT,
          error: false,
          loading: false,
          sucess: true,
          action: "ADD_TREATMENT",
        });
      })
      //else dispatch error true

      .catch((err) => {
        catchError(err);
        dispatch({
          type: ADD_TREATMENT,
          error: true,
          loading: false,
          sucess: false,
          action: "ADD_TREATMENT",
        });
      });

    //dont forget to add type : ADD_TREATMENT in every case
  };
};

export const updateTreatmentAction = (data) => {
  return function (dispatch) {
    dispatch({
      type: UPDATE_PATIENT_TREATMENT,
      sucess: false,
      error: false,
      loading: true,
      action: "UPDATE_PATIENT_TREATMENT",
    });

    updatePatientTreatmentApi(data)
      .then((res) => res.data)
      .then((data) => {
        dispatch({
          type: UPDATE_PATIENT_TREATMENT,
          error: false,
          loading: false,
          sucess: true,
          action: "UPDATE_PATIENT_TREATMENT",
        });
      })
      //else dispatch error true

      .catch((err) => {
        catchError(err);
        dispatch({
          type: UPDATE_PATIENT_TREATMENT,
          error: true,
          loading: false,
          sucess: false,
          action: "UPDATE_PATIENT_TREATMENT",
        });
      });
  };
};
