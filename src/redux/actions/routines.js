import {
    FETCH_ROUTINES_PENDING,
    FETCH_ROUTINES_ERROR,
    SEND_ROUTINE,
    ACCEPT_ROUTINE
} from '../constants/routines';
import config from '../../config'

export const sendRoutine = (idPatient, pictograms) => {
    return dispatch => {
        dispatch({ type: FETCH_ROUTINES_PENDING });
        fetch(`${config.server}/phrases/${idPatient}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application-json'
            },
            body: JSON.stringify({pictograms})
        })
        .then( res => res.json())
        .then( data => data && dispatch({ type: SEND_ROUTINE }))
        .catch( err => dispatch({ type: FETCH_ROUTINES_ERROR, payload: {err}}));
    }
}

export const acceptRoutine = () =>{
    return dispatch =>{
        dispatch({type: ACCEPT_ROUTINE});
    }
} 