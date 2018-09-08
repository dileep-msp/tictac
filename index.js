/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = 1;
    grid[colIdx][rowIdx] = newValue;
    renderMainGrid();
    addClickHandlers();
    if(isCompleted()){
    	renderMainGrid();
    	window.alert("Player won");
    	window.stop();
    	exit;
    	//code to display that the player who made the last move won.
    }
    if(isDraw()){
    	renderMainGrid();
    	window.alert("Match Draw");
    	window.stop();
    	//code to display that the match is draw
    }
    computerTurn();
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}
function getCell(){
	var vacantCells=[];
	var vacantValue=0
	var colIdx=0;
	var rowIdx=0;
	for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++){
		for(let rowIdx=0; rowIdx < GRID_LENGTH; rowIdx++){
			if(grid[rowIdx][colIdx]==0){
				vacantCell=new Array(rowIdx,colIdx);
				vacantCells.push(vacantCell);
			}
		}
	}
	var len=vacantCells.length;
	var rand=Math.floor(Math.random() * len-1) + 1 ;
	return vacantCells[rand];
}
function computerTurn(){
	//get vacant cell in random
	vacantCell=getCell();
    var rowIdx = vacantCell[0];
    var colIdx = vacantCell[1];
    let newValue = 2;
    grid[rowIdx][colIdx] = newValue;
    renderMainGrid();
    if(isCompleted()){
    	window.alert("Computer won");
    	window.stop();
    	exit;
    	//code to display that the player who made the last move won.
    }
    if(isDraw()){
    	//code to display that the match is draw
    	window.alert("Match Draw");
    	window.stop();

    }
    addClickHandlers();
}

//This function should be called after every click user and computer
function isCompleted(){
	//row completed
	for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        if(grid[colIdx][0]!=0 && grid[colIdx][0]==grid[colIdx][1] && grid[colIdx][1]==grid[colIdx][2]){
        	return true;
        }
    }
	//row completed
	for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        if(grid[0][colIdx]!=0 && grid[0][colIdx]==grid[1][colIdx] && grid[1][colIdx]==grid[2][colIdx]){
        	return true;
        }
    }
	//diagonal completed left-top to bottom-right
	if(grid[0][0]!=0 && grid[0][0]==grid[1][1] && grid[1][1]==grid[2][2]){
		return true;
	}
	//diagonal completed left-bottom to top-right
	if(grid[2][0]!=0 && grid[2][0]==grid[1][1] && grid[1][1]==grid[0][2]){
		return true;
	}
	return false;
	
}

function isDraw(){
	//Check if the entire grid is full with no winner
	for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++){
		for(let rowIdx=0; rowIdx < GRID_LENGTH; rowIdx++){
			if(grid[rowIdx][colIdx]==0){
				return false;
			}
		}
	}
	return true;
}

initializeGrid();
renderMainGrid();
addClickHandlers();
