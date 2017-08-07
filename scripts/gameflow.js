

var height = 5
var width = 3
var percent = 0.10
var clicksToGo
var mines = new Array()

var minefieldTable = document.getElementById("minefield")

newGame(height, width, percent, minefieldTable, "welcome")

function initializeButtons(height, width, tableObject){
	for( i = 0; i < height; i++){
		newrow = tableObject.insertRow(i)
		for( j = 0; j< width; j++){
			cell = newrow.insertCell(j)
			cell.onclick = function(var1,var2,var3) {
				return function(){
					stepOn(var1, var2,var3)
				}
			}(i, j,cell);
		}
	}
}

function removeOnClick(cell){
	cell.onclick = null;
}


function clearTable(tableObject){
	while(tableObject.rows.length > 0) {
 			tableObject.deleteRow(0);
	}
}

function stepOn(r, c, cell){
	if(isMine(r,c,mines)){
		newGame(height, width, percent, minefieldTable, "game over")
	}else{
		cell.innerHTML = getCount(r, c, mines)
		removeOnClick(cell)
		clicksToGo--
		if(clicksToGo === 0){
			newGame(height, width, percent, minefieldTable, "you won")
		}
	}

}

function newGame(height, width, percent, minefieldTable, message){
	mines = generateMines(height, width, percent)

	alert(message)
	clicksToGo = height * width - mines.length
	clearTable(minefieldTable)
	initializeButtons(height, width, minefieldTable)	
}