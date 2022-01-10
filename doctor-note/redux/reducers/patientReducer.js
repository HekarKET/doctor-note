import {
  DELETE_PATIENT_TREATMENT,
  FETCH_PATIENTS,
  FETCH_PATIENT_NAMES,
  ADD_PATIENT,
  ADD_TREATMENT,
  UPDATE_PATIENT_TREATMENT,
} from "../constants/constant";

const initialState = {
  error: false,
  loading: false,
  sucess: false,
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
        sucess: action.sucess || state.sucess,
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
        sucess: action.sucess || state.sucess,
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
        sucess: action.sucess || state.sucess,
        action: action.action || state.action,
        patientNames: action.patientNames || state.patientNames,
        action: action.action || state.action,
      };

    case ADD_PATIENT:
      return {
        ...state,
        error: action.error,
        loading: action.loading,
        sucess: action.sucess,
        // patientNames: action.patientNames || state.patientNames,
        action: action.action || state.action,
        message: action.message || state.message,
      };

    // Create case for ADD_TREATMENT
    // Accept all the action properties

    case ADD_TREATMENT:
      return {
        ...state,
        error: action.error,
        loading: action.loading,
        sucess: action.sucess,
        // patientNames: action.patientNames || state.patientNames,
        action: action.action || state.action,
      };

    case UPDATE_PATIENT_TREATMENT:
      return {
        ...state,
        error: action.error,
        loading: action.loading,
        sucess: action.sucess,
        // patientNames: action.patientNames || state.patientNames,
        action: action.action || state.action,
      };
    default:
      return state;
  }
}
