var scoreToWin = 3;
var currentPlayerScore = 0;
var currentComputerScore = 0;

var playerChoice;
var computerChoice;

function startGame() {
	computerChoice = Math.floor(Math.random() * 3);

	// run animation

	if (playerChoice == computerChoice) updateInfoLine(0);
	if (playerChoice == (computerChoice + 1) % 3) updateInfoLine(1);
	if (computerChoice == (playerChoice + 1) % 3) updateInfoLine(-1);

	checkAndReset();
}

function updateInfoLine(gameState) {
	switch (gameState) {
		case 0:
			document.getElementById("infoLine").innerHTML = "Draw.";
			break;
		case 1:
			document.getElementById("infoLine").innerHTML = "Player Wins!";
			currentPlayerScore++;
			break;
		case -1:
			document.getElementById("infoLine").innerHTML = "Computer Wins...";
			currentComputerScore++;
			break;
	}
}

function checkAndReset() {
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


	// bring back options
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