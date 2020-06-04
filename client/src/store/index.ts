import { createStore } from 'redux';
import rootReducer from './reducer';

const initialState = {};

const store = createStore(rootReducer, initialState);

export default store;
