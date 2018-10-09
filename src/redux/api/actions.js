import types from './actionType';
export const setUser = param => ({
	type: types.SET_USER,
	payload: param
});

export const auth = object => ({
	type: types.SET_USER,
	payload: object
});
export const setCurrentData = object => ({
	type: types.SET_CURRENT_DATA,
	payload: object
});
export const openDialog = object => {
	const open = {
		type: types.OPEN_CONTEXT,
		payload: true
	};
	return dispatch => {
		dispatch(open);
		dispatch(setCurrentData(object));
	};
};

export const closeDialog = event => {
	const closeDialog = {
		type: types.CLOSE_CONTEXT,
		payload: false
	};
	return closeDialog;
};
