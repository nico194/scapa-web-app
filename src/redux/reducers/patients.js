import { 
    FETCH_PATIENTS_PENDING,
    FETCH_PATIENTS_ERROR,
    FETCH_PATIENTS_SUCCESS,
    FETCH_ADD_PATIENT_SUCCESS,
    FETCH_REMOVE_PATIENT_SUCCESS,
  } from '../constants/patients';

const initialState = {
    loading: false,
    patient: {},
    patients : [],
    err: {},
}

const patientsReducer = ( state = initialState, { type, payload }) => {
    switch(type) {
        default:
            return state
    }
}

export default patientsReducer;