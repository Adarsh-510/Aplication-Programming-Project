import { updateScore, getScores, getCookie } from '../../globalFiles/externalLogic.js';

const userID = getCookie('userID');
const username = getCookie('username') || 'Player';
const gameName = 'rockpaperscissors';

const scoreToWin = 3;
var currentPlayerScore = 0;
var currentComputerScore = 0;
var localScore = 0;
var scoreThisGame = 0;

var playerChoice;
var computerChoice;

const options = ['./icons/rock1.png', './icons/paper1.png', './icons/scissors1.png'];

async function setBoard() {
	if (userID) {
		let scores = await getScores(userID);
		document.getElementById('score').innerHTML = "SCORE: " + scores[gameName];
	} else {
		document.getElementById('score').innerHTML = "SCORE: " + localScore;
	}
} setBoard();

function startGame() {
	computerChoice = Math.floor(Math.random() * 3);

	runAnimation();

	setTimeout(() => {
	if (playerChoice === computerChoice) {
		// draw
	} else if (playerChoice === (computerChoice + 1) % 3) {
		currentPlayerScore++;
	} else {
		currentComputerScore++;
	}

		setTimeout(async () => {
		if (!(await checkWin())) nextTurn();
	}, 1250);
	}, 1500);
}

function checkWin() {
	if (currentPlayerScore >= scoreToWin || currentComputerScore >= scoreToWin) {
		if (currentPlayerScore >= scoreToWin) {
			if (currentComputerScore == 0) scoreThisGame = 115;
			else if (currentComputerScore == 1) scoreThisGame = 100;
			else scoreThisGame = 85;
			scoreThisGame += Math.floor(Math.random() * 11) - 5;

			localScore += scoreThisGame;
			announceResults(1);
		} else {
			scoreThisGame = 0;
			announceResults(0);
		}

		setTimeout(async () => {
		if (userID) {
			await updateScore(userID, gameName, scoreThisGame);
			let scores = await getScores(userID);
			document.getElementById('score').innerHTML = "SCORE: " + scores[gameName];
		} else {
			document.getElementById('score').innerHTML = "SCORE: " + localScore;
		}

		currentComputerScore = 0;
		currentPlayerScore = 0;

		document.getElementById('result').style.display = "none";
		nextTurn();
		return true;
		}, 2000);
	}
	return false;
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

function nextTurn() {
	document.getElementById('optionContainer').style.display = "flex";
	document.getElementById('gameContainer').style.transform = "scale(1)";
	document.getElementById('animationContainer').style.display = "none";
	document.getElementById('computerchoice').src = './icons/rock1.png';
	document.getElementById('playerchoice').src = './icons/rock1.png';	
}

function announceResults(gameState) {
	let result = document.getElementById('result');

	result.innerHTML = (() => {
		switch (gameState) {
			case 0: return "Computer Wins..";
			case 1: return username + " Wins!!";
		}
	})();
	result.style.display = "block";
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

