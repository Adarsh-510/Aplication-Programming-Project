import { updateScore, getScore, getCookie } from '../../globalFiles/externalLogic.js';

var scoreToWin = 3;
var currentPlayerScore = 0;
var currentComputerScore = 0;

var playerChoice;
var computerChoice;

function startGame() {
	computerChoice = Math.floor(Math.random() * 3);

	if (playerChoice == computerChoice) 					updateInfoLine(0);
	if (playerChoice == (computerChoice + 1) % 3) updateInfoLine(1);
	if (computerChoice == (playerChoice + 1) % 3) updateInfoLine(-1);

	runAnimation();
	check();
}

function runAnimation() {
	
}

// replace by a popup in the animation
function updateInfoLine(gameState) {
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