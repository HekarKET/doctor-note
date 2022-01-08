import {
  DELETE_PATIENT_TREATMENT,
  FETCH_PATIENTS,
  FETCH_PATIENT_NAMES,
  ADD_PATIENT
} from "../constants/constant";

const initialState = {
  error: false,
  loading: false,
  sucesss: false,
  action: "",
  patients: [],
  currentPatient: {},
  patientNames: [],
  total: 0,
};

export function patientReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PATIENTS:
      return {
        ...state,
        error: action.error || state.error,
        loading: action.loading || state.loading,
        sucesss: action.sucesss || state.sucesss,
        action: action.action || state.action,
        patients: action.patients || state.patients,
        currentPatient: action.currentPatient || state.currentPatient,
        total: action.total == -1 ? state.total : action.total || state.total,
      };

    case DELETE_PATIENT_TREATMENT:
      return {
        ...state,
        error: action.error || state.error,
        loading: action.loading || state.loading,
        sucesss: action.sucesss || state.sucesss,
        action: action.action || state.action,
        patients: action.patients || state.patients,
        currentPatient: action.currentPatient || state.currentPatient,
        total: state.total - 1,
      };

    case FETCH_PATIENT_NAMES:
      return {
        ...state,
        error: action.error || state.error,
        loading: action.loading || state.loading,
        sucesss: action.sucesss || state.sucesss,
        action: action.action || state.action,
        patientNames: action.patientNames || state.patientNames,
      };


    case ADD_PATIENT:
      return {
        ...state,
        error: action.error,
        loading: action.loading,
        sucesss: action.sucesss,
        patientNames: action.patientNames || state.patientNames,
      }

// Create case for ADD_TREATMENT 
// Accept all the action properties


    default:
      return state;
  }
}
