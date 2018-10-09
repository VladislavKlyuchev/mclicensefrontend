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
	switch (action.type) {
		case 'ADD_NODE':
			return { ...state };
		case types.SELECT_ALL_GROUPS:
			return state.groups;
		case types.SET_NEW_USER:
			return { ...state, defaultTree: action.payload };
		case types.SET_CURRENT_DATA:
			return { ...state, current: action.payload };
		case types.SET_GROUP:
			return { ...state, groups: action.payload };
		case types.ADD_PARENT: 
			return { ...state, defaultTree: action.payload}	
		case types.SET_TO_GROUP:
			return { ...state, groups: action.payload };
		default:
			return state;
	}
};
