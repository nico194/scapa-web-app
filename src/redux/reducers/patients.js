import { 
    FETCH_PATIENTS_PENDING,
    FETCH_PATIENTS_ERROR,
    FETCH_PATIENTS_SUCCESS,
    FETCH_PATIENT_SUCCESS,
    FETCH_ADD_PATIENT_SUCCESS,
    UNLINK_PATIENT_SUCCESS,
  } from '../constants/patients';

const initialState = {
    loading: false,
    patient: {},
    patients : [],
    err: null,
}

const patientsReducer = ( state = initialState, { type, payload }) => {
    switch(type) {
        case FETCH_PATIENTS_PENDING: {
            return {
                ...state,
                loading: true
            }
        }
        case FETCH_PATIENTS_ERROR: {
            return {
                ...state,
                loading: false,
                err: payload.err
            }
        }
        case FETCH_PATIENTS_SUCCESS: {
            return {
                ...state,
                loading: false,
                patients: payload.patients
            }
        }
        case UNLINK_PATIENT_SUCCESS: {
            return {
                ...state,
                loading: false,
                patients: state.patients.filter(pictogram => pictogram.id !== payload.id)
            }
        }
        case FETCH_PATIENT_SUCCESS: {
            return {
                ...state,
                loading: false,
                patient: payload.patient
            }
        }
        default:
            return state
    }
}

export default patientsReducer;