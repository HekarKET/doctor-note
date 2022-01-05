import { fetchPatientsApi } from "../../util/api";
import { catchError } from "../../util/util";
import { FETCH_PATIENTS } from "../constants/constant";

export const fetchPatientAction = (data, count) => {
  return function (dispatch) {
    fetchPatientsApi(data, count)
      .then((res) => res.data)
      .then((data) =>
        dispatch({
          type: FETCH_PATIENTS,
          error: false,
          loading: false,
          sucesss: true,
          patients: data.patients,
          currentPatient: data.patients && data.patients.length !== 0 ? data.patients[0]: {},
          total: data.total,
        })
      )
      .catch((err) => {
        catchError(err);
        dispatch({
          type: FETCH_PATIENTS,
        });
      });
  };
};
