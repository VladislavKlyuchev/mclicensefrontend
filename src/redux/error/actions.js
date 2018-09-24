import types from './actionType';

export const setError = error => ({
	type: types.SET_ERROP,
	payload: error
});

export const deleteError = error => ({
	type: types.DELETE_ERROR
});
