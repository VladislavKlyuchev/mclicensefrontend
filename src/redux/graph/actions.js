import types from './actionType';
import store from '@redux';
import searchTree from '@/functions/searchTree';
export const createNewGroup = object => {
	const newGroup = {
		name: object.name,
		users: []
	};
	return (dispatch, getState) => {
		let groups = getState().graph.groups;
		groups.push(newGroup);

		const result = {
			type: types.SET_GROUP,
			payload: groups.slice(0)
		};
		console.log('state', getState());
		console.log('fsdfsdfsdfsdf');
		return result;
	};
};
export const addUserToGroup = object => {
	const user = {
		id: object.name,
		admin: object.admin
	};
	return (dispatch, getState) => {
		const groups = getState().graph.groups;
		const group = groups.find(g => g.name == object.group);
		group.users.push(user);

		const result = {
			type: types.SET_TO_GROUP,
			payload: groups.slice(0)
		};
		return result;
	};
};

export const createNewUser = object => {
	return (dispatch, getState) => {
		const users = getState().graph.defaultTree;
		const user = searchTree(users, object.parent);
		if (user == null) alert('нет такого!');
		const newUser = {
			id: object.user.id,
			targets: [],
			children: []
		};
		user.children.push(newUser);
		const groupUser = {
			name: object.user.id,
			admin: object.user.admin,
			group: object.user.group
		};
		dispatch(addUserToGroup(groupUser));
		let result = {
			type: types.SET_NEW_USER,
			payload: users
		};
		return result;
	};
};

export const addNewParent = object => {
	return (dispatch, getState) => {
		const tree = getState().graph.defaultTree;
		const user = searchTree(tree, object.toUser);
		user.targets.push(object.fromUser);

		const result = {
			type: types.ADD_PARENT,
			payload: tree
		};
		return result;
	};
};

export const setCurrent = event => {
	return (dispatch, getState) => {
        
		const prevCurrent = getState().graph.current;

		if (prevCurrent && prevCurrent.id == event.id) {
			return;
		} else {
			const result = {
				type: types.SET_CURRENT_DATA,
				payload: event
			};
			dispatch(setCurrentUser(result));
		}
	};
};
export const setCurrentUser = object => {
	return object;
};
