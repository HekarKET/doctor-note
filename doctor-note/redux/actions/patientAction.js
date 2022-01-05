import { deletePatientTreatmentApi, fetchPatientsApi } from "../../util/api";
import { catchError } from "../../util/util";
import {
  DELETE_PATIENT_TREATMENT,
  FETCH_PATIENTS,
} from "../constants/constant";

export const fetchPatientAction = (data, count) => {
  return function (dispatch) {
    dispatch({
      type: FETCH_PATIENTS,
      error: false,
      loading: true,
      sucesss: true,
    });

    fetchPatientsApi(data, count)
      .then((res) => res.data)
      .then((data) =>
        dispatch({
          type: FETCH_PATIENTS,
          error: false,
          loading: false,
          sucesss: true,
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
          error: false,
          loading: false,
          sucesss: true,
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
          sucesss: false,
          message: err.response.message,
        });
      });
  };
};
