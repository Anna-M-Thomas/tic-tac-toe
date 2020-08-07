document.addEventListener("DOMContentLoaded", function(){

const player = (name, XO) => {
	const selfIntro = () => {
		return `Name: ${name} X or O: ${XO}`;
	}
	let myTurn = null;
	return {name, XO, selfIntro, myTurn};
};

const George = player("George_the_Cat", "X");
const Betsy = player("Betsy_the_Caterpillar", "O");

//There's going to need to be more than one game...
//Tie this into an event listener on a button
const game = () => {
	//You can just set one to true and one to false while making them
	let player1 = George;
	let player2 = Betsy;
	let players = [player1, player2];
	player1.myTurn = true;
	player2.myTurn = false;
	let counter = 0;
	let keepGoing = true;

	const whoseTurn = () => {
		myTurn = players.find(player=>player.myTurn===true);
		return myTurn;
	}

	const nextTurn = () =>{
		player1.myTurn = !(player1.myTurn);
		player2.myTurn = !(player2.myTurn);
	}

	const turnCounter = () => {
		if(counter<=8&&keepGoing){
			counter++;
			console.log(counter);
		} else{
			keepGoing = false;
			console.log("This is the false part of turnCounter and keepGoing is" + keepGoing);
		}
	}

	const checkCounter = () =>{
		return counter;
	}

	const checkWin = (array) =>{
		 let regex = /X{3}|O{3}/;
		 let rowcheck = "";
		 let colcheck = "";
		 let diagcheck = "";

//row check
  			for(let j=0; j<3; j++){
	    		for(let i=0; i<3; i++){
      			rowcheck += array[i + (j*3)];
      			}
    		rowcheck += " ";
  			}
//column check 
  			for(let j=0; j<3; j++){
	    		for(let i=0; i<3; i++){
      			colcheck += array[(i * 3) + j];
      			}
    		colcheck += " ";
  			}
//diagonal check
  		diagcheck = array[0] + array[4] + array[8] + " " + array[2] + array[4] + array [6];
  if(rowcheck.match(regex)||colcheck.match(regex)||diagcheck.match(regex)){
  	keepGoing = false;
  	console.log("This is the false part of checkWin and keepGoing is" + keepGoing);
  };
}

	return {whoseTurn, nextTurn, turnCounter, checkCounter, checkWin, keepGoing};
}

const newGame = game();

//anonymous function for the game board
(function (){
let myGameBoard = {

	boardArray: ["", "", "", "", "", "", "", "", ""],

	init: function(){
		this.cacheDom();
		this.bindEvents();
		this.render();
	},

	cacheDom: function(){
		this.gameBoard = document.getElementById('gameboard');
		this.squareDivs = document.getElementsByClassName("boardsquare");
		this.playerDiv = document.getElementById('players');
	},

	bindEvents: function(){
		this.gameBoard.addEventListener('click', this.playSquare.bind(this));
	},

	playSquare: function(event){
		if((newGame.keepGoing)&&event.target.textContent===""){
			//returns the player object whose turn it is
			let myTurn = newGame.whoseTurn();
			event.target.textContent = myTurn.XO;
			let index = Array.prototype.indexOf.call(this.gameBoard.children, event.target);
			this.boardArray[index] = myTurn.XO;
			newGame.checkWin(this.boardArray);
			console.log("playSquare thinks keepGoing is" + newGame.keepGoing);
			newGame.nextTurn();
			newGame.turnCounter();
		}
	},

	render: function(){
		for(let i=0; i<this.boardArray.length; i++){
			this.squareDivs[i].textContent= this.boardArray[i];
		}

		this.playerDiv.textContent = "Test";
	},

 };
	myGameBoard.init();
})();

});
