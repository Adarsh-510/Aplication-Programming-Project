import { updateScore, getScore, getCookie } from '../../globalFiles/externalLogic.js';

const gameName = 'rockpaperscissors';
const options = ['./icons/rock1.png', './icons/paper1.png', './icons/scissors1.png'];

const userID = getCookie('userID');
const username = getCookie('username');

var scoreToWin = 3;
var currentPlayerScore = 0;
var currentComputerScore = 0;
var localScore = 0;

var playerChoice;
var computerChoice;
var scoreThisGame = 0;

async function setBoard() {
	if (userID) {
		document.getElementById('score').innerHTML = "SCORE: " + await getScore(userID, gameName);
	} else {
		document.getElementById('score').innerHTML = "SCORE: " + localScore;
	}
} setBoard();

function startGame() {
	computerChoice = 0*Math.floor(Math.random() * 3);

	runAnimation();
	if (playerChoice === computerChoice) {
		// draw
	} else if (playerChoice === (computerChoice + 1) % 3) {
		currentPlayerScore++;
	} else {
		currentComputerScore++;
	}
	check();
	setTimeout(nextTurn, 4000);
}

function runAnimation() {
	document.getElementById('optionContainer').style.display = "none";
	document.getElementById('gameContainer').style.transform = "scale(1.125)";
	document.getElementById('animationContainer').style.display = "flex";
	document.getElementById('computerchoice').addEventListener('animationend', () => {
		document.getElementById('computerchoice').src = options[computerChoice];
		document.getElementById('playerchoice').src = options[playerChoice];
	});
}

// replace by a overlay popup
async function check() {
	if (currentPlayerScore >= scoreToWin) {
		if(currentComputerScore == 0) scoreThisGame = 125;
		else if(currentComputerScore == 1) scoreThisGame = 100;
		else scoreThisGame = 75;

		currentComputerScore = 0;
		currentPlayerScore = 0;
		console.log(scoreThisGame);
		localScore += scoreThisGame;

		if (userID) {
			await updateScore(userID, gameName, scoreThisGame);
			document.getElementById('score').innerHTML = "SCORE: " + await getScore(userID, gameName);
		} else {
			document.getElementById('score').innerHTML = "SCORE: " + localScore;
		}
		window.alert("Player Wins!");
	}
	if (currentComputerScore >= scoreToWin) {
		window.alert("Computer Wins...");
		currentComputerScore = 0;
		currentPlayerScore = 0;
	}
	
}

document.querySelectorAll(".options").forEach(option => {
	option.onclick = () => {
		switch (option.id) {
			case "rock":
				playerChoice = 0;
				break;
			case "paper":
				playerChoice = 1;
				break;
			case "scissors":
				playerChoice = 2;
				break;
		}
		startGame();
	};
});

function nextTurn (){
	document.getElementById('optionContainer').style.display = "flex";
	document.getElementById('gameContainer').style.transform = "scale(1)";
	document.getElementById('animationContainer').style.display = "none";
	document.getElementById('computerchoice').src = './icons/rock1.png';
	document.getElementById('playerchoice').src = './icons/rock1.png';	
}