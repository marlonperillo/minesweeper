

var height = 5
var width = 3
var percent = 0.10
var clicksToGo
var mines = new Array()


var minefieldTable = document.getElementById("minefield")
newGame(height, width, percent, minefieldTable, "welcome")

//sets all td of a table into a button
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

//remove onClick function of td
function removeOnClick(cell){
	cell.onclick = null;
}

//remove all rows of a table
function clearTable(tableObject){
	while(tableObject.rows.length > 0)
 			tableObject.deleteRow(0)
	
}

//function to be placed on a button
//mainly the game logic right here
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

//new game
//height width percent tableobject and message are passed as parameters
function newGame(height, width, percent, minefieldTable, message){
	alert(message)
	mines = generateMines(height, width, percent)
	clicksToGo = height * width - mines.length
	clearTable(minefieldTable)
	initializeButtons(height, width, minefieldTable)	
}
//mines and clicksToGo are global consider how to make them parameters as well
