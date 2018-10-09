

export function findTargets(objectT) {
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

export function findLinks(objectT) {
    let array = [];
	if(objectT.targets && objectT.targets.length > 0) {
  	objectT.targets.forEach(el => {
        const obj = { source: objectT.id, target: el}
      array.push(obj)
    })
  }
  if(objectT.children && objectT.children.length > 0) {
   	objectT.children.forEach(el =>  {
    	var tmpArray = findLinks(el);
      array.push(tmpArray.flat());
    })
  }
  return array.flat()
}
