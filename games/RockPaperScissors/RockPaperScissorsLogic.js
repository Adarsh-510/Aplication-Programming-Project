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

async function setBoard() {
	if (userID) {
		document.getElementById('score').innerHTML = "SCORE: " + await getScore(userID, gameName);
	} else {
		document.getElementById('score').innerHTML = "SCORE: " + localScore;
	}
} setBoard();

async function startGame() {
	computerChoice = Math.floor(Math.random() * 3);

	await runAnimation();

	if (playerChoice == computerChoice) updateInfoLine(0);
	if (playerChoice == (computerChoice + 1) % 3) updateInfoLine(1);
	if (computerChoice == (playerChoice + 1) % 3) updateInfoLine(-1);

	check();
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

// replace by a popup in the animation
async function updateInfoLine(gameState) {
	switch (gameState) {
		case 0:
			document.getElementById("infoLine").innerHTML = "Computer choose " + computerChoice + ". It's a Draw.";
			break;
		case 1:
			document.getElementById("infoLine").innerHTML = "Computer choose " + computerChoice + ". Player Wins!";
			currentPlayerScore++;
			break;
		case -1:
			document.getElementById("infoLine").innerHTML = "Computer choose " + computerChoice + ". Computer Wins...";
			currentComputerScore++;
			break;
	}

	var scoreThisGame = 100;
	localScore += scoreThisGame;

	if (userID) {
		await updateScore(userID, gameName, scoreThisGame);
		document.getElementById('score').innerHTML = "SCORE: " + await getScore(userID, gameName);
	} else {
		document.getElementById('score').innerHTML = "SCORE: " + localScore;
	}
}

// replace by a overlay popup
function check() {
	if (currentPlayerScore >= scoreToWin) {
		window.alert("Player Wins!!!");
		currentComputerScore = 0;
		currentPlayerScore = 0;
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