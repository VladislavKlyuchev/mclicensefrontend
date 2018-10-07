export default function getArrayFromTree(object) {
	let array = [];
  array.push(object);
	if(object.children && object.children.length > 0) {
  	for(let i = 0 ;i < object.children.length; i++) {
    	array = array.concat(getArrayFromTree(object.children[i]))
    }
  }
  return array
}