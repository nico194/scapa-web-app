import { FETCH_PICTOGRAMS_PENDING,
         FETCH_PICTOGRAMS_ERROR,
         FETCH_PICTOGRAMS_SUCCESS, 
         FETCH_ADD_PICTOGRAM_SUCCESS,
         FETCH_UPDATE_PICTOGRAM_SUCCESS,
         FETCH_DELETE_PICTOGRAM_SUCCESS,
       } from '../constants/pictograms';
import config from '../../config';

export const getPictograms = () => {
    return dispatch => {
        dispatch({ type: FETCH_PICTOGRAMS_PENDING});
        fetch(`${config.ip}/pictograms`)
        .then(res => res.json())
        .then(pictograms => {
            return dispatch({ type: FETCH_PICTOGRAMS_SUCCESS, payload: {pictograms}})
        })
        .catch( err => dispatch({ type: FETCH_PICTOGRAMS_ERROR, payload: {err}}))
    }
}

export const getPictogramsByCategory = (id) => {
    return dispatch => {
        dispatch({ type: FETCH_PICTOGRAMS_PENDING});
        fetch(`${config.ip}/pictograms/category/${id}`)
        .then(res => res.json())
        .then(pictograms => {
            return dispatch({ type: FETCH_PICTOGRAMS_SUCCESS, payload: {pictograms}})
        })
        .catch( err => dispatch({ type: FETCH_PICTOGRAMS_ERROR, payload: {err}}))
    }
}

export const addPictogram = (pictogram) => {
    const formData = new FormData();
    formData.append("pictogramImage", pictogram.image, `${pictogram.description}.jpg`);
    formData.append("description", pictogram.description);
    formData.append('category_id', pictogram.idCategory);
    for (var key of formData.entries()) {
        console.log(key[0] + ', ' + key[1]);
    }  
    return dispatch => {
        fetch(`${config.ip}/pictograms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL'
            },
            body: formData
        })
        .then(res => res.json())
        .then(data => data.insert === 'success' ? dispatch({ type: FETCH_ADD_PICTOGRAM_SUCCESS, payload: { pictogram }}) : 'error')
        .catch(err => dispatch({type: FETCH_PICTOGRAMS_ERROR, payload: {err}}));
    }
}

export const deletePictogram = (id) => {
    return dispatch => {
        fetch(`${config.ip}/pictograms/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(data => data.delete === 'success' ? dispatch({ type: FETCH_DELETE_PICTOGRAM_SUCCESS, payload: {id}}) : 'error')
        .catch(err => dispatch({type: FETCH_PICTOGRAMS_ERROR, payload: {err}}));
    }
}

export const updatePictogram = (id, newDescription) => {
    return dispatch => {
        fetch(`${config.ip}/pictograms/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({description: newDescription})
        })
        .then(res => res.json())
        .then(data => data.update === 'success' ? dispatch({ type: FETCH_UPDATE_PICTOGRAM_SUCCESS, payload: {id, newDescription}}) : 'error')
        .catch(err => dispatch({type: FETCH_PICTOGRAMS_ERROR, payload: {err}}));
    }
}
