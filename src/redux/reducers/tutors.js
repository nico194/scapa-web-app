import {
    FETCH_TUTORS_PENDING,
    FETCH_TUTORS_ERROR,
    TUTORS_SIGNIN_SUCCESS,
    TUTORS_SIGNUP_SUCCESS,
    TUTORS_LOGOUT,
} from '../constants/tutors'

const initialState = {
    loading: false,
    signInAdmin: false,
    signInTutor: false,
    tutor: {},
    err: null
}

const tutorsReducer = (state = initialState, { type, payload }) => {
    console.log('payload',payload)
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
                tutor: payload.tutor
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