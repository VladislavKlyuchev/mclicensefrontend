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
			payload: groups
		};
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
			payload: groups
		};
		return result;
	};
};

export const createNewUser = object => {
	return (dispatch, getState) => {
		const users = getState().graph.defaultTree;
		const user = searchTree(users, object.parent);
		if (user == null) alert('нет такого!');
		user.children.push(object.user);
		console.log(users);
		let result = {
			type: types.SET_NEW_USER,
			payload: users
		};
		return result;
	};
};
