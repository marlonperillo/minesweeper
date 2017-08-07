
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

function getCount(r, c, minesList){

	var sum = 0;
	var x, y;

	//1
	y = r + 1;
	x = c - 1;
	if(isMine(y,x,minesList))
		sum ++;

	//2
	y = r;
	x = c - 1;
	if(isMine(y,x,minesList))
		sum ++;

	//3
	y = r - 1;
	x = c - 1;
	if(isMine(y,x,minesList))
		sum ++;

	//4
	y = r + 1;
	x = c;
	if(isMine(y,x,minesList))
		sum ++;

	//5
	y = r + 1;
	x = c + 1;
	if(isMine(y,x,minesList))
		sum ++;

	//6
	y = r;
	x = c + 1;
	if(isMine(y,x,minesList))
		sum ++;
	
	//7
	y = r - 1;
	x = c + 1;
	if(isMine(y,x,minesList))
		sum ++;

	//8
	y = r - 1;
	x = c;
	if(isMine(y,x,minesList))
		sum ++;

	return sum;
}

function isMine(r,c,minesList){
	return minesList.indexOf(r + ',' +c) != -1
}
