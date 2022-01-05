import { FETCH_PATIENTS } from "../constants/constant";

const initialState = {
  error: false,
  loading: false,
  sucesss: false,
  patients: [],
  currentPatient: {},
  total: 0,
};

export function patientReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PATIENTS:
      return {
        error: action.error,
        loading: action.loading,
        sucesss: action.sucesss,
        patients: action.patients,
        currentPatient: action.currentPatient,
        total: action.total,
      };

    default:
      return state;
  }
}
