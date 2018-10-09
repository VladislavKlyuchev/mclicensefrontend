import { combineReducers } from 'redux';
import api from './api/reducers';
import error from './error/reducers';
import graph from './graph/reducers';

export default combineReducers({
	api,
	error,
	graph
});
