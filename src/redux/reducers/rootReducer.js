import { combineReducers } from 'redux';
import categoriesReducer from './categories';
import pictogramsReducer from './pictograms';

const rootReducer = combineReducers({
    categories: categoriesReducer,
    pictograms: pictogramsReducer,
});

export default rootReducer;