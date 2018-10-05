import types from './actionType';
export const setUser = param => ({
	type: types.SET_USER,
	payload: param
});

export const auth = object => ({
	type: types.SET_USER,
	payload: object
});

export const getOpenContext = object => {
	const v = {
		type: types.OPEN_CONTEXT,
		payload: object
	};
	return dispatch => {
		dispatch();
	};
};
