
initialize(10, 3)

function initialize(height, width){

	var minefield_object = document.getElementById("minefield")

	setupmine(height, width, minefield_object)


}

function setupmine(height, width, tableObject){

	for( i = 0; i < height; i++){
		newrow = tableObject.insertRow(i)
		for( j = 0; j< width; j++){
			cell = newrow.insertCell(j)
			cell.innerHTML = "[r" + i + "|c" + j +"]"
			cell.onclick = function(var1,var2) {
				return function(){
					stepOn(var1, var2)
				}
			}(i, j);
		}
	}
}

function stepOn(r, c){
	console.log(r, c);
}