import types from './actionType';

export const setUser = param => ({
	type: types.SET_USER,
	payload: param
});

export const setError = param => ({
	type: types.SET_ERROR,
	payload: param
});
