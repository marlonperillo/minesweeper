

height = 10
width = 3
percent = 0.23

var minefieldObject = document.getElementById("minefield")
initializeTableMineField(height, width, minefieldObject)
mines = generateMines(height, width, percent)



function generateMines(height, width, percent){

	var list = new Array()

	var minesCount = parseInt( height * width * percent)

	for(count = 0; count < minesCount; ){
		randomRow = parseInt(Math.random() * height)
		randomWidth = parseInt(Math.random() * width)
		if(list.indexOf(randomRow + ',' + randomWidth) == -1){
			list.push(randomRow + ',' + randomWidth)
			count++
		}
	}
	return list

}

function initializeTableMineField(height, width, tableObject){

	for( i = 0; i < height; i++){
		newrow = tableObject.insertRow(i)
		for( j = 0; j< width; j++){
			cell = newrow.insertCell(j)
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