import { 
    FETCH_PATIENTS_PENDING,
    FETCH_PATIENTS_ERROR,
    FETCH_PATIENTS_SUCCESS,
    FETCH_ADD_PATIENT_SUCCESS,
    FETCH_REMOVE_PATIENT_SUCCESS,
  } from '../constants/patients';
import config from '../../config';

export const getPatientsByTutor = (id) => {
    return dispatch => {
        dispatch({ type: FETCH_PATIENTS_PENDING });
        fetch(`${config.ip}/patients/tutor/${id}`, {
            method: 'GET',
            header: {
                
            }
        })
    }
}