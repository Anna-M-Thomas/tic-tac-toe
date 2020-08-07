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

	//You can just set one to true and one to false while making them
	const getPlayers = (player1obj, player2obj) => {
		player1 = player1obj;
		player2 = player2obj;
		players.push(player1);
		players.push(player2);
		player1.myTurn = true;
		player2.myTurn = false;
		keepGoing = true;
	}

	const whoseTurn = () => {
		myTurn = players.find(player=>player.myTurn===true);
		return myTurn;
	}

	const nextTurn = () =>{
		player1.myTurn = !(player1.myTurn);
		player2.myTurn = !(player2.myTurn);
				if(counter<8&&keepGoing){
			counter++;
		} else{
			keepGoing = false;
		}
	}

	const keepGoingCheck = () =>{
		return keepGoing;
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
	return {getPlayers, whoseTurn, nextTurn, keepGoingCheck, checkWin};
})();

//anonymous function for the game board
(function (){
	'use strict';
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
		this.playerInfo = document.getElementById('playerinfo');
		this.playButton = document.getElementById('startbutton');
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
		this.playerInfo.style.display = "inline";
		this.gameBoard.style.filter = "brightness(50%)";
	},

	formDone: function(){
		if(this.playerForm.reportValidity()){
			let player1obj = player(this.player1field.value, "X");
			let player2obj = player(this.player2field.value, "O");
			game.getPlayers(player1obj, player2obj);
			this.playerDiv.textContent = `${player1obj.name}: ${player1obj.XO}, ${player2obj.name}: ${player2obj.XO} `
			this.playButton.style.display = "none";
			this.playerInfo.style.display = "none";
			this.gameBoard.style.filter = "brightness(100%)";
		}
	}, 

	playSquare: function(event){
		if((game.keepGoingCheck())&&event.target.textContent===""){
			//returns the player object whose turn it is
			let myTurn = game.whoseTurn();
			event.target.textContent = myTurn.XO;
			let index = Array.prototype.indexOf.call(this.gameBoard.children, event.target);
			this.boardArray[index] = myTurn.XO;
			game.checkWin(this.boardArray);
			console.log("playSquare thinks keepGoing is" + game.keepGoingCheck());
			game.nextTurn();
		}
	},

	render: function(){
		for(let i=0; i<this.boardArray.length; i++){
			this.squareDivs[i].textContent= this.boardArray[i];
		}
	},

 };
	myGameBoard.init();
})();

});
