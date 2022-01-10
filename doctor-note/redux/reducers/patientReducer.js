import {
  DELETE_PATIENT_TREATMENT,
  FETCH_PATIENTS,
  FETCH_PATIENT_NAMES,
  ADD_PATIENT,
  ADD_TREATMENT,
  UPDATE_PATIENT_TREATMENT,
  UPDATE_PATIENT,
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
        error: action.error ,
        loading: action.loading ,
        sucess: action.sucess ,
        action: action.action ,
    
        patients: action.patients || state.patients,
        currentPatient: action.currentPatient || state.currentPatient,
        total: action.total == -1 ? state.total : action.total || state.total,
      };

    case FETCH_PATIENT_NAMES:
      return {
        ...state,
        error: action.error ,
        loading: action.loading ,
        sucess: action.sucess ,
        action: action.action ,
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

      case UPDATE_PATIENT:
        return {
          ...state,
          error: action.error,
          loading: action.loading,
          sucess: action.sucess,
          // patientNames: action.patientNames || state.patientNames,
          action: action.action || state.action,
          message: action.message || state.message,
          patients: action.patients || state.patients
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

    case DELETE_PATIENT_TREATMENT:
      return {
        ...state,
        error: action.error ,
        loading: action.loading ,
        sucess: action.sucess,
        action: action.action ,
        patients: action.patients || state.patients,
        currentPatient: action.currentPatient || state.currentPatient,
        total: state.total - 1,
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
