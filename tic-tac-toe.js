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

	const whoseTurn = () => {
		myTurn = players.find(player=>player.myTurn===true);
		return myTurn;
	}

	const nextTurn = () =>{
		player1.myTurn = !(player1.myTurn);
		player2.myTurn = !(player2.myTurn);
	}

	const turnCounter = () => {
		counter++;
	}

	const checkCounter = () =>{
		return counter;
	}

	return {whoseTurn, nextTurn, turnCounter, checkCounter};
}

const newGame = game();

//anonymous function for the game board
(function (){
let myGameBoard = {

	boardArray: ["X", "X", "O", "X", "O", "X", "O", "X", "O"],

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
		if((newGame.checkCounter()<=8)&&event.target.textContent===""){
			//returns the player object whose turn it is
			let myTurn = newGame.whoseTurn();
			event.target.textContent = myTurn.XO;
			let index = Array.prototype.indexOf.call(this.gameBoard.children, event.target);
			this.boardArray[index] = myTurn.XO;
			newGame.nextTurn();
			newGame.turnCounter();
		}
	},

	render: function(){
		for(let i=0; i<this.boardArray.length; i++){
			this.squareDivs[i].textContent= this.boardArray[i];
		}

		this.playerDiv.textContent = "Test";
//we're going to fuck around with the rows and columns in here 
let string1 = this.boardArray[0] + this.boardArray[1] + this.boardArray[2];
console.log(string1);

	},

 };
	myGameBoard.init();
})();

});
