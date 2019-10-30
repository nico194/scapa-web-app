import {
    FETCH_USERS_PENDING,
    FETCH_USERS_ERROR,
    USER_SIGNIN_SUCCESS,
    USER_SIGNUP_SUCCESS,
    USER_LOGOUT,
} from '../constants/users'
import config from '../../config';

export const signIn = (user) => {
    return dispatch => {
        dispatch({ type: FETCH_USERS_PENDING});
        fetch(`${config.server}/users/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then( response => response.json())
        .then( data => {
            const userEncripted = btoa(JSON.stringify(data.user))
            localStorage.setItem('user', userEncripted)
            return dispatch({ type: USER_SIGNIN_SUCCESS, payload: {user: data.user}})
        })
        .catch( err => dispatch({ type: FETCH_USERS_ERROR, payload: {err}}));
    }
}

export const signUp = (user) => {
    return dispatch => {
        console.log('User: ', user);
        const typeUser = user.typeUser !== '' ? user.typeUser : 'tutor';
        const formData = new FormData();
        formData.append('userImage', user.image);
        formData.append('name', user.name);
        formData.append('birthday', user.birthday);
        formData.append('email', user.email);
        formData.append('password', user.password);
        formData.append('type_user', typeUser);
        
        dispatch({ type: FETCH_USERS_PENDING});
        fetch(`${config.server}/users/signup`, {
            method: 'POST',
            body: formData
        })
        .then( response => response.json())
        .then( data => {
            if(data){
                console.log('data', data);
                user.id = data.id;
                user.image = data.path;
                user.typeUser = typeUser;
                console.log('User Complete: ', user);
                dispatch({ type: USER_SIGNUP_SUCCESS, payload: {user}})
            }            
        })
        .catch( err => dispatch({ type: FETCH_USERS_ERROR, payload: {err}}));
    }
}

export const logOut = () => {
    return dispatch => {
        localStorage.setItem('user', JSON.stringify({}))
        dispatch({ type: USER_LOGOUT, payload: { user: {} } })
    }
}