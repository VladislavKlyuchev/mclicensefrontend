import getInfo from '@/functions/getInfo';
import types from './actionType';
const initialState = {
	defaultTree: {
		id: 'Vasya',
		children: [],
		targets: []
	},
	current: {},
	groups: []
};

export default (state = initialState, action) => {
	console.log(action);
	switch (action.type) {
		case 'ADD_NODE':
			return { ...state };
		case types.SELECT_ALL_GROUPS:
			return Object.assign({}, state.groups);
		case types.SELECT_ALL_TREE:
			return Object.assign({}, state.defaultTree);
		case types.SELECT_CURRENT:
			return Object.assign({}, state.current);
		case types.SET_NEW_USER:
			return Object.assign({}, state, (state.defaultTree = action.payload));
		case types.SET_CURRENT_DATA:
			return Object.assign({}, state, (state.current = action.payload));
		case types.SET_GROUP:
			return Object.assign({}, state, (state.groups = action.payload));
		case types.ADD_PARENT:
			return Object.assign({}, state, (state.defaultTree = action.payload));
		case types.SET_TO_GROUP:
			return Object.assign({}, state, (state.groups = action.payload));
		default:
			return Object.assign({}, state);
	}
};
