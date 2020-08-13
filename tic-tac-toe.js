document.addEventListener("DOMContentLoaded", function(){

const player = (name, XO) => {
	let myTurn = null;
	return {name, XO, myTurn};
};

const game = (() => {
	let counter = 0;
	let keepGoing = false;
	let players = [];
	let player1;
	let player2;

	//Get players and start game
	const getPlayers = (player1obj, player2obj) => {
		player1 = player1obj;
		player2 = player2obj;
		players.push(player1);
		players.push(player2);
		player1.myTurn = true;
		player2.myTurn = false;
		keepGoing = true;
	}

//returns the player whose turn it is
	const whoseTurn = () => {
		myTurn = players.find(player=>player.myTurn===true);
		return myTurn;
	}

//Changes to next turn unless there's a win or no more turns left
//Combine this with checkWin somehow?
	const nextTurn = () =>{
		player1.myTurn = !(player1.myTurn);
		player2.myTurn = !(player2.myTurn);
				if(counter<8&&keepGoing){
			counter++;
		} else{
			keepGoing = false;
		}
	}
	const endGame = () =>{
		players = [];
		counter = 0; 
		rowcheck = "";
		colcheck = "";
		diagcheck = "";
	}

//Check if the game has already ended
	const keepGoingCheck = () =>{
		return keepGoing;
	}

//Check for a win
	const checkWin = (array) =>{
		 let regex = /X{3}|O{3}/;
		 let rowcheck = "";
		 let colcheck = "";
		 let diagcheck = "";

	//row check!
  			for(let j=0; j<3; j++){
	    		for(let i=0; i<3; i++){
      			rowcheck += array[i + (j*3)];
      			}
    		rowcheck += " ";
  			}
	//column check!
  			for(let j=0; j<3; j++){
	    		for(let i=0; i<3; i++){
      			colcheck += array[(i * 3) + j];
      			}
    		colcheck += " ";
  			}
	//diagonal check!
  		diagcheck = array[0] + array[4] + array[8] + " " + array[2] + array[4] + array [6];
  if(rowcheck.match(regex)||colcheck.match(regex)||diagcheck.match(regex)){
  	keepGoing = false;
 //this should return the regex match to check if it matches winner shown
  	console.log(rowcheck.match(regex)||colcheck.match(regex)||diagcheck.match(regex));
  }else{
  	return 0;
  };
}
	return {getPlayers, whoseTurn, nextTurn, keepGoingCheck, checkWin, endGame};
})();

//anonymous function for the game board
(function (){

let myGameBoard = {

	boardArray: ["", "", "", "", "", "", "", "", ""],

	init: function(){
		this.cacheDom();
		this.bindEvents();
		this.render();
	},

//Check to see if there's stuff you didn't actually need here
	cacheDom: function(){
//gameboard stuff
		this.gameBoard = document.getElementById('gameboard');
		this.squareDivs = document.getElementsByClassName("boardsquare");
		this.buttonDiv = document.getElementById('buttondiv');
//bottom panel stuff
		this.playButton = document.getElementById('startbutton');
		this.displayTextDiv = document.getElementById('displaytextdiv');
		this.playerInfo = document.getElementById('playerinfo');
//form stuff
		this.playerForm = document.getElementById('playerform');
		this.player1field = document.getElementById('player1');
		this.player2field = document.getElementById('player2');
		this.playerFormButton = document.getElementById('finishedbutton');
	},

	bindEvents: function(){
		this.playButton.addEventListener('click', this.showForm.bind(this));
		this.playerFormButton.addEventListener('click', this.formDone.bind(this));
		this.gameBoard.addEventListener('click', this.playSquare.bind(this));
	},

	showForm: function(){
		this.render();
		this.playerInfo.style.display = "inline";
		this.buttonDiv.style.filter = "brightness(50%)";
		this.displayTextDiv.style.filter = "brightness(50%)";
		this.gameBoard.style.filter = "brightness(50%)";
	},

	hideForm: function(){
		this.playerForm.reset();
		this.playerInfo.style.display = "none";
		this.gameBoard.style.filter = "brightness(100%)";
		this.displayTextDiv.style.filter = "brightness(100%)";
		this.buttonDiv.style.filter = "brightness(100%)";
	},

	showButton: function(){
		this.playButton.style.display = "inline";
	},

	hideButton: function(){
		this.playButton.style.display = "none";
	},

	displayText: function(string){
		this.displayTextDiv.innerText = string;
	},

//Makes player objects after form is done, feeds them into game, hides form
	formDone: function(){
		if(this.playerForm.reportValidity()){
			let player1obj = player(this.player1field.value, "X");
			let player2obj = player(this.player2field.value, "O");
			game.getPlayers(player1obj, player2obj);
			this.displayText(`${player1obj.name} is ${player1obj.XO}, ${player2obj.name} is ${player2obj.XO}`); 
			this.hideForm();
			this.hideButton();
		}
	}, 

//Returns the object whose turn it is, adds X or O to div and to array
//Checks for a win, and either calls nextTurn or ends game
	playSquare: function(event){
		if((game.keepGoingCheck())&&event.target.textContent===""){
			let myTurn = game.whoseTurn();
			event.target.textContent = myTurn.XO;
			let index = Array.prototype.indexOf.call(this.gameBoard.children, event.target);
			this.boardArray[index] = myTurn.XO;
			checkTie = game.checkWin(this.boardArray);
			game.nextTurn();
			let keepGoing = game.keepGoingCheck();
			 if(keepGoing===false){
			 	 if(checkTie ===0){
			 	 	this.displayText("It's a tie! Press start for new game."); 
			 	 } else {
			 		this.displayText(`${myTurn.name} (${myTurn.XO}) wins! Press start for new game.`);
			 		}
			 	this.boardArray =  ["", "", "", "", "", "", "", "", ""];
			 	game.endGame();
			 	this.showButton();
			 }

		}
	},

//for if I want to put test values in array, and resetting for new game
	render: function(){
		for(let i=0; i<this.boardArray.length; i++){
			this.squareDivs[i].textContent= "";
		}
	},

 };
	myGameBoard.init();
})();

});
