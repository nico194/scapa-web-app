import {
    FETCH_TUTORS_PENDING,
    FETCH_TUTORS_ERROR,
    TUTORS_SIGNIN_SUCCESS,
    TUTORS_SIGNUP_SUCCESS,
    TUTORS_LOGOUT,
} from '../constants/tutors'
import config from '../../config';

export const signIn = (tutor) => {
    return dispatch => {
        dispatch({ type: FETCH_TUTORS_PENDING});
        fetch(`${config.ip}/tutors/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tutor)
        })
        .then( response => response.json())
        .then( data => {
            const tutor = btoa(JSON.stringify(data.tutors))
            localStorage.setItem('tutor', tutor)
            if(data.tutors.email === 'admin') {
                return dispatch({ type: TUTORS_SIGNIN_SUCCESS, payload: { tutor: data.tutors, signInAdmin: true, signInTutor: false }})
            } else {
                    return dispatch({ type: TUTORS_SIGNIN_SUCCESS, payload: { tutor: data.tutors, signInTutor: true, signInAdmin: false }})    
            }
        })
        .catch( err => dispatch({ type: FETCH_TUTORS_ERROR, payload: {err}}));
    }
}

export const signUp = (tutor) => {
    return dispatch => {
        dispatch({ type: FETCH_TUTORS_PENDING});
        fetch(`${config.ip}/tutors/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tutor)
        })
        .then( response => response.json())
        .then( data => {
            if(data.token) {
                return dispatch({ type: TUTORS_SIGNUP_SUCCESS, payload: { tutor: data.tutor}})
            }
        })
        .catch( err => dispatch({ type: FETCH_TUTORS_ERROR, payload: {err}}));
    }
}

export const logOut = () => {
    return dispatch => {
        localStorage.setItem('tutor', JSON.stringify({}))
        dispatch({ type: TUTORS_LOGOUT, payload: { tutor: {}, signInAdmin: false, signInTutor: false  } })
    }
}