document.addEventListener("DOMContentLoaded", function(){

const player = (name, icon) => {
	const selfIntro = () => {
		return `Name: ${name} Icon: ${icon}`;
	}

	return {name, icon, selfIntro};
};

const George = player("George_the_Cat", "=^^=");

//There's going to need to be more than one game...
//Tie this into an event listener on a button
const game = () => {
	let player1= player(prompt("Give me a name"), prompt("Give me an icon"),); 
	console.log(player1);
}

game();

//anonymous function for the game board
(function (){
let myGameBoard = {

	boardArray: ["X", "X", "O", "X", "X", "O", "X", "X", "O"],

	init: function(){
		this.cacheDom();
		this.render();
	},

	cacheDom: function(){
		this.squareDivs = document.getElementsByClassName("boardsquare");
		this.playerDiv = document.getElementById('players');
	},

	render: function(){
		for(let i=0; i<this.boardArray.length; i++){
			this.squareDivs[i].textContent= this.boardArray[i];
		}

		this.playerDiv.textContent = George.selfIntro();
	},

 };
	myGameBoard.init();
})();

});
