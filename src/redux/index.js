import { combineReducers } from 'redux';
import api from './api/reducers';
import error from './error/reducers';

export default combineReducers({
    api,
    error
})