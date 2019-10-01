import { FETCH_CATEGORIES_PENDING,
         FETCH_CATEGORIES_ERROR,
         FETCH_CATEGORIES_SUCCESS, 
         FETCH_ADD_CATEGORY_SUCCESS,
         FETCH_UPDATE_CATEGORY_SUCCESS,
         FETCH_DELETE_CATEGORY_SUCCESS,
       } from '../constants/categories';
import config from '../../config';

export const getCategories = () => {
    return dispatch => {
        dispatch({ type: FETCH_CATEGORIES_PENDING});
        fetch(`${config.ip}/categories`)
        .then(res => res.json())
        .then(categories => {
            return dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: {categories}})
        })
        .catch( err => dispatch({ type: FETCH_CATEGORIES_ERROR, payload: {err}}))
    }
}

export const getCategoriesByPatient = id => {
    return dispatch => {
        dispatch({ type: FETCH_CATEGORIES_PENDING});
        fetch(`${config.ip}/categories/folder/${id}`)
        .then(res => res.json())
        .then(categories => {
            return dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: {categories}})
        })
        .catch( err => dispatch({ type: FETCH_CATEGORIES_ERROR, payload: {err}}))
    }
}

export const addCategory = (description) => {
    return dispatch => {
        fetch(`${config.ip}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({description})
        })
        .then(res => res.json())
        .then(data => data.insert === 'success' ? dispatch({ type: FETCH_ADD_CATEGORY_SUCCESS, payload: { category: { id: data.response.id, description: description }}}) : 'error')
        .catch(err => dispatch({type: FETCH_CATEGORIES_ERROR, payload: {err}}));
    }
}

export const deleteCategory = (id) => {
    return dispatch => {
        fetch(`${config.ip}/categories/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(data => data.delete === 'success' ? dispatch({ type: FETCH_DELETE_CATEGORY_SUCCESS, payload: {id}}) : 'error')
        .catch(err => dispatch({type: FETCH_CATEGORIES_ERROR, payload: {err}}));
    }
}

export const updateCategory = (id, newDescription) => {
    return dispatch => {
        fetch(`${config.ip}/categories/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({description: newDescription})
        })
        .then(res => res.json())
        .then(data => data.update === 'success' ? dispatch({ type: FETCH_UPDATE_CATEGORY_SUCCESS, payload: { id, newDescription }}) : 'error')
        .catch(err => dispatch({type: FETCH_CATEGORIES_ERROR, payload: {err}}));
    }
}
