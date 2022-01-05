import {
  DELETE_PATIENT_TREATMENT,
  FETCH_PATIENTS,
} from "../constants/constant";

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
        error: action.error || state.error,
        loading: action.loading || state.loading,
        sucesss: action.sucesss || state.sucesss,
        patients: action.patients || state.patients,
        currentPatient: action.currentPatient || state.currentPatient,
        total: action.total == -1 ? state.total : action.total || state.total,
      };

    case DELETE_PATIENT_TREATMENT:
      return {
        error: action.error || state.error,
        loading: action.loading || state.loading,
        sucesss: action.sucesss || state.sucesss,
        patients: action.patients || state.patients,
        currentPatient: action.currentPatient || state.currentPatient,
        total: state.total-1,
      };
    default:
      return state;
  }
}
