import { createStore, combineReducers } from 'redux';
import CategoriesReducer from './reducers/categories';

const reducer = combineReducers({
    CategoriesReducer,
});

const store = createStore(reducer);

export default store;