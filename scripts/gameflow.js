
var height = 7
var width = 8
var percent = 0.15
var clicksToGo
var minefieldTable
newGame()
var newGameButton = document.getElementById("newgameButton")
newGameButton.onclick = function(){
	newGame()
}

//sets all td of a table into a button
function initializeButtons(height, width, tableObject){
	for( i = 0; i < height; i++){
		newrow = tableObject.insertRow(i)
		for( j = 0; j< width; j++){
			cell = newrow.insertCell(j)
			cell.onclick = function(var1,var2,var3) {
				return function(){
					cellClick(var1, var2,var3)
					checkGameStatus()
				}
			}(i, j,cell);
		}
	}
}

function removeAllClicks(tableObject){
	var height = tableObject.getElementsByTagName("tr").length
	var width =  tableObject.getElementsByTagName("tr")[0].getElementsByTagName("td").length
	var cell
	for( i = 0; i < height; i++){
		for( j = 0; j< width; j++){
			cell = getTd(i,j,tableObject)
			if(cell != null)
				removeOnClick(cell)
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

function updateBanner(message){
	document.getElementById("banner").innerHTML = message
}

//check if player has won
function checkGameStatus(){
	if( clicksToGo == 0 ){
		updateBanner("you won")
		removeAllClicks(minefieldTable)
	}

}

//function to be placed on a button
//step on a cell and assess if game over
function cellClick(r, c, cell){
	stepOn(r,c,cell)
}


//step on a cell in the field of mines
function stepOn(r,c,cell){
	if(isMine(r,c,mines)){
		updateBanner("game over")
		cell.style.backgroundColor="red"
		removeAllClicks(minefieldTable)
	}else{
		removeOnClick(cell)	
		count = getCount(r, c, mines)
		if(count != 0)
			cell.innerHTML = count
		cell.style.backgroundColor = "#222222"
		cell.style.borderColor = "black"
		if(count == 0)
			stepSurrounding(r,c, minefieldTable)
		clicksToGo --
	}
}

function newGame(){
	minefieldTable = document.getElementById("minefield")
	setupGame(height,width,percent,minefieldTable)
}

//new game
//height width percent tableobject and message are passed as parameters
function setupGame(height, width, percent, minefieldTable){
	mines = generateMines(height, width, percent)
	clicksToGo = height * width - mines.length
	clearTable(minefieldTable)
	initializeButtons(height, width, minefieldTable)
	updateBanner("WELCOME");
}

//step on x,y with extra precautions
function attemptStep(y,x,graphObject){
	var tdObject = getTd(y,x,graphObject)
	if(  tdObject != null)
		if(tdObject.onclick != null)
			stepOn(y,x,tdObject)
}

//get td tag
function getTd(y,x,graphObject){
    var row = graphObject.getElementsByTagName("tr")[y]
	if(row == null)
		return null
    var cell = row.getElementsByTagName("td")[x]
	return cell
}

//step on surrounding cells
function stepSurrounding(r,c,graphObject){
	var x, y;

	//1
	y = r + 1;
	x = c - 1;
	attemptStep(y,x,graphObject)

	//2
	y = r;
	x = c - 1;
	attemptStep(y,x,graphObject)
	
	//3
	y = r - 1;
	x = c - 1;
	attemptStep(y,x,graphObject)

	//4
	y = r + 1;
	x = c;
	attemptStep(y,x,graphObject)
	
	//5
	y = r + 1;
	x = c + 1;
	attemptStep(y,x,graphObject)

	//6
	y = r;
	x = c + 1;
	attemptStep(y,x,graphObject)

	//7
	y = r - 1;
	x = c + 1;
	attemptStep(y,x,graphObject)

	//8
	y = r - 1;
	x = c;
	attemptStep(y,x,graphObject)
}