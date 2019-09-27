import { combineReducers } from 'redux';
import categoriesReducer from './categories';
import pictogramsReducer from './pictograms';
import tutorsReducer from './tutors';
import patientsReducer from './patients';

const rootReducer = combineReducers({
    categories: categoriesReducer,
    pictograms: pictogramsReducer,
    tutors: tutorsReducer,
    patients: patientsReducer
});

export default rootReducer;