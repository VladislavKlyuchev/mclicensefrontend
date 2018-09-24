import types from './actionType';

const initialState = {
	error: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case types.SET_ERROR:
			return { ...state, error: action.payload };
		case types.DELETE_ERROR:
			return { ...state, error: null };
		default:
			return state;
	}
};
