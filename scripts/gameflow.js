
var height = 7
var width = 6
var percent = 0.16
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
					cellClick(var1, var2,var3)
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
function cellClick(r, c, cell){
	stepOn(r,c,cell)
	if( clicksToGo == 0 ){
		clicksToGo = -1
		newGame(height, width, percent, minefieldTable, "you won")
	}
}

//step on a cell in the field of mines
function stepOn(r,c,cell){
	if(isMine(r,c,mines)){
		newGame(height, width, percent, minefieldTable, "game over")
	}else{
		
		count = getCount(r, c, mines)
		if(count != 0)
			cell.innerHTML = count
		cell.style.backgroundColor = "#222222"
		cell.style.borderColor = "black"
		removeOnClick(cell)
		if(count == 0)
			stepSurrounding(r,c)

		clicksToGo --
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

function stepSurrounding(r,c){
	var x, y;

	//1
	y = r + 1;
	x = c - 1;
	tdObject = getTd(y,x)
	if(  tdObject != null)
		if(tdObject.onclick != null)
			stepOn(y,x,tdObject)

	//2
	y = r;
	x = c - 1;
	tdObject = getTd(y,x)
	if(  tdObject != null)
		if(tdObject.onclick != null)
			stepOn(y,x,tdObject)
	//3
	y = r - 1;
	x = c - 1;

	tdObject = getTd(y,x)
	if(  tdObject != null)
		if(tdObject.onclick != null)
			stepOn(y,x,tdObject)

	//4
	y = r + 1;
	x = c;
	tdObject = getTd(y,x)
	if(  tdObject != null)
		if(tdObject.onclick != null)
			stepOn(y,x,tdObject)
	
	//5
	y = r + 1;
	x = c + 1;
	
	tdObject = getTd(y,x)
	if(  tdObject != null)
		if(tdObject.onclick != null)
			stepOn(y,x,tdObject)

	//6
	y = r;
	x = c + 1;
	
	tdObject = getTd(y,x)
	if(  tdObject != null)
		if(tdObject.onclick != null)
			stepOn(y,x,tdObject)

	//7
	y = r - 1;
	x = c + 1;
	
	tdObject = getTd(y,x)
	if(  tdObject != null)
		if(tdObject.onclick != null)
			stepOn(y,x,tdObject)

	//8
	y = r - 1;
	x = c;
	tdObject = getTd(y,x)
	if(  tdObject != null)
		if(tdObject.onclick != null)
			stepOn(y,x,tdObject)
}

function getTd(y,x){
    d = minefieldTable .getElementsByTagName("tr")[y]
	if(d == null)
		return null
    r = d.getElementsByTagName("td")[x]
	return r
}
