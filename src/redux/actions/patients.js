import { 
    FETCH_PATIENTS_PENDING,
    FETCH_PATIENTS_ERROR,
    FETCH_PATIENTS_SUCCESS,
    LINK_PATIENT_SUCCESS,
    UNLINK_PATIENT_SUCCESS,
  } from '../constants/patients';
import config from '../../config';

export const getPatientsByTutor = (id) => {
    return dispatch => {
        dispatch({ type: FETCH_PATIENTS_PENDING });
        fetch(`${config.ip}/patients/tutor/${id}`, {
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            }
        })
        .then( response => response.json())
        .then( patients => dispatch({ type: FETCH_PATIENTS_SUCCESS, payload: {patients}}))
        .catch( err => dispatch({ type: FETCH_PATIENTS_ERROR, payload: {err}}));
    }
}

export const unlinkPatient = (id) => {
    return dispatch => {
        dispatch({ type: FETCH_PATIENTS_PENDING });
        fetch(`${config.ip}/patients/tutor/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tutor_id: 9 })
        })
        .then( response => response.json())
        .then( data => {
            console.log('data update:', data);
            dispatch({ type: UNLINK_PATIENT_SUCCESS, payload: {id} })
        })
        .catch( err => dispatch({ type: FETCH_PATIENTS_ERROR, payload: {err}}))
    }
}