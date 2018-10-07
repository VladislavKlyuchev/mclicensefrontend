export default function uniqueArray(array, newArray ) {
	let result = [];
	for(var i = 0; i < newArray.length ; i++ ) {
  	var is = false;
  	for(let k = 0; k < array.length; k++) {
    	if(array[k].id === newArray[i].id)  {
      	is = true
      }
    }
    if(!is) result.push(newArray[i]) 
  }
  
  return array.concat(result)
}