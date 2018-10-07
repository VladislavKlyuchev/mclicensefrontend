export default function searchTree(element, matchingTitle){
    if(element.title == matchingTitle){
         return element;
    }else if (element.children != null){
         var i;
         var result = null;
         for(i=0; result == null && i < element.children.length; i++){
              result = searchTree(element.children[i], matchingTitle);
         }
         return result;
    }
    return null;
}

////



function getArrayFromTree(object) {
	let array = [];
  array.push(object);
	if(object.children && object.children.length > 0) {
  	for(let i = 0 ;i < object.children.length; i++) {
    	array = array.concat(getArrayFromTree(object.children[i]))
    }
  }
  return array
}
function searchTree(element, matchingTitle){
    if(element.id == matchingTitle){
         return element;
    }else if (element.children != null){
         var i;
         var result = null;
         for(i=0; result == null && i < element.children.length; i++){
              result = searchTree(element.children[i], matchingTitle);
         }
         return result;
    }
    return null;
}
function findTargets(objectT) {
	let array = [];
	if(objectT.targets && objectT.targets.length > 0) {
  	objectT.targets.forEach(el => {
      array.push(el)
    })
  }
  if(objectT.children && objectT.children.length > 0) {
   	objectT.children.forEach(el =>  {
    	var tmpArray = findTargets(el);
      array.push(tmpArray.flat());
    })
  }
  return array.flat()
}
function unicueArray(array, newArray ) {
	return array.concat(newArray.filter(el => array.includes(sub => el.id == sub.id) !== true))
}
var exampleTree = {
	id: 'Vasya',
  children: [
  	{
    	id: 'Nastya',
      children: [ 
      	{
        	id: 'Pasha',
          children: [
          	{
            	id: 'Givi'
            },
            {
            	id: 'Yes'
            }
          ]
        }
      ]
    },
    
    {
    	id: 'Sonya',
      children: [
      	{
        	id: 'Katya',
          children: [
          	{
            	id:'Vova'
            },
            {
            	id: 'Pok'
            }
          ]
        },
        {
        	id: 'Fury',
          children: [
          	{
            	id: 'AAAA',
              targets: ['Pasha']
            }
          ]
        }
      ]
    }
  ]
}










function getInfo(object, global, current = []) {
	console.log('current ', current)
	const targets = findTargets(object)
  const currentArray = unicueArray(current, getArrayFromTree(object))
  console.log('currentArray ', currentArray)
  if(currentArray.length > 100 ) return; 
  const objNotFound = targets.filter(el => currentArray.some((obj) => obj.id == el) !== true);
  console.log('ObjectNotFound ', objNotFound)
  const objectsFromTargets = objNotFound.map(el => searchTree(global, el))
  let array = [];
  if(objectsFromTargets && objectsFromTargets.length > 0) {
  			for(let i = 0; i < objectsFromTargets.length; i++) {
        		console.log(objectsFromTargets)
        		array.push(getInfo(objectsFromTargets[i], global, currentArray))
        }
  }
  return array
}
console.log(getInfo(exampleTree.children[1], exampleTree))