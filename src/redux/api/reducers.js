import types from './actionType';

const initialState = {
	auth: true,
	context: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case types.SET_USER:
			return { ...state, user: action.payload };
		case types.SET_ERROR:
			return { ...state, error: action.payload };
		case types.OPEN_CONTEXT:
			return { ...state, context: true };
		case types.CLOSE_CONTEXT:
			return { ...state, context: false };
		default:
			return state;
	}
};
