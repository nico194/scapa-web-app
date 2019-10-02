import {
    FETCH_TUTORS_PENDING,
    FETCH_TUTORS_ERROR,
    TUTORS_SIGNIN_SUCCESS,
    TUTORS_SIGNUP_SUCCESS,
    TUTORS_LOGOUT,
} from '../constants/tutors'

let initial = true;
if(initial){
    localStorage.setItem('tutor', JSON.stringify({}));
    initial = false;
}
const regExp = new RegExp(`^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$`);
const isBase64 = regExp.test(localStorage.getItem('tutor'));

const initialState = {
    loading: false,
    signInAdmin: false,
    signInTutor: false,
    signUpTutor: false,
    tutor: isBase64 ? JSON.parse(atob(localStorage.getItem('tutor'))) : {},
    err: null
}

const tutorsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_TUTORS_PENDING:{
            return {
                ...state,
                loading: true
            }
        }
        case FETCH_TUTORS_ERROR: {
            return {
                ...state,
                err: payload.err
            }
        }
        case TUTORS_SIGNIN_SUCCESS: {
            return {
                ...state,
                loading: true,
                tutor: payload.tutor,
                signInAdmin: payload.signInAdmin,
                signInTutor: payload.signInTutor,
            }
        }
        case TUTORS_SIGNUP_SUCCESS: {
            return {
                ...state,
                loading: false,
                tutor: payload.tutor,
                signUpTutor: true,
            }
        }
        case TUTORS_LOGOUT: {
            return {
                ...state,
                loading: false,
                tutor: payload.tutor,
                signInAdmin: payload.signInAdmin,
                signInTutor: payload.signInTutor,
            }
        }
        default:
            return state
    }
}

export default tutorsReducer;