import types from './actionType';

const initialState = {
	user: {
		name: 'Goha'
	}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case types.SET_USER:
			return { ...state, user: action.user };
		case types.SET_ERROR:
			return { ...state, error: action.payload };
		default:
			return state;
	}
};
