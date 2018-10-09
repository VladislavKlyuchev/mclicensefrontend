import findInTree from './findInTree';
import getArrayFromTree from './getArrayFromTree';
import uniqueArray from './uniqueArray';
import {findTargets} from './findTargets';
import searchTree from './searchTree';

export default function getInfo(object, global, current = []) {
	const targets = findTargets(object);
	const currentArray = uniqueArray(current, getArrayFromTree(object));
	const objNotFound = targets.filter(
		el => currentArray.some(obj => obj.id == el) !== true
	);
	const objectsFromTargets = objNotFound.map(el => searchTree(global, el));

	let result;
	if (objectsFromTargets && objectsFromTargets.length > 0) {
		for (let i = 0; i < objectsFromTargets.length; i++) {
			result = uniqueArray(
				currentArray,
				getInfo(objectsFromTargets[i], global, currentArray)
			);
		}
	} else {
		result = currentArray;
	}
	return result;
}
