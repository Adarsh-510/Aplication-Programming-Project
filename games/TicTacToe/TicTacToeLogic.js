import { updateScore, getScore, getCookie } from '../../globalFiles/externalLogic.js';

const userID = getCookie('userID');
const username = getCookie('username');
const gameName = 'tictactoe';

let startMove, currentMove, board, validCells, localScore = 0;
setBoard();

async function setBoard() {
  if (userID) document.getElementById('score').innerHTML = "SCORE: " + await getScore(userID, gameName);
  else document.getElementById('score').innerHTML = "SCORE: " + localScore;

  board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  validCells = ["cell00", "cell01", "cell02", "cell10", "cell11", "cell12", "cell20", "cell21", "cell22"];
  document.querySelectorAll(".cell").forEach(cell => {
    cell.innerHTML = "";
    cell.style.backgroundColor = "#96B1C5";
  });

  startMove = (Math.floor(Math.random() * 2) == 0) ? "x" : "o";
  currentMove = startMove;
  document.getElementById("infoLine").innerHTML = (currentMove == "o") ? "CURRENT TURN: PLAYER" : "CURRENT TURN: COMPUTER";

  if (currentMove == "x") makeRandomMove();
}

function makeMove(cell) {
  validCells.splice(validCells.indexOf(cell), 1);
  document.getElementById(cell).innerHTML = (currentMove == "x") ? '<img src="./icons/computerMark.png">' : '<img src="./icons/playerMark.png">';
  board[cell[4]][cell[5]] = (currentMove == "x") ? -1 : 1;
  currentMove = (currentMove == "x") ? "o" : "x";
  document.getElementById("infoLine").innerHTML = (currentMove == "o") ? "CURRENT TURN: PLAYER" : "CURRENT TURN: COMPUTER";
  document.getElementById(cell).style.backgroundColor = "#7B9DB7";

  nextTurnLogic();
}

function nextTurnLogic() {
  let gameState = checkBoard();

  if (gameState == 1 || gameState == 2 || gameState == 3) endGame(gameState);
  else if (currentMove == "x")
    if (typeof gameState == 'string' && Math.floor(Math.random() * 100) < 75)
      setTimeout(() => {
        makeMove(gameState);
      }, 1500 + Math.floor(Math.random() * 501) - 250);
    else makeRandomMove();
}

function makeRandomMove() {
  setTimeout(function () {
    makeMove(validCells[Math.floor(Math.random() * validCells.length)]);
  }, 1250 + Math.floor(Math.random() * 501) - 250);
}

function checkBoard() {
  let gameState = 0;

  let rowSum;
  for (let i = 0; i < 3; i++) {
    rowSum = 0;
    for (let j = 0; j < 3; j++) {
      rowSum += board[i][j];
    }
    if (rowSum == 3) return 1;
    if (rowSum == -3) return 2;
    if (rowSum == 2 || rowSum == -2)
      for (let j = 0; j < 3; j++)
        if (board[i][j] == 0)
          gameState = "cell" + i.toString() + j.toString();
  }

  let colSum;
  for (let i = 0; i < 3; i++) {
    colSum = 0;
    for (let j = 0; j < 3; j++) {
      colSum += board[j][i];
    }
    if (colSum == 3) return 1;
    if (colSum == -3) return 2;
    if (colSum == 2 || colSum == -2)
      for (let j = 0; j < 3; j++)
        if (board[j][i] == 0)
          gameState = "cell" + j.toString() + i.toString();
  }

  let leftDiagonalSum = 0, rightDiagonalSum = 0;
  for (let i = 0; i < 3; i++) {
    leftDiagonalSum += board[i][i];
    rightDiagonalSum += board[i][2 - i];
  }
  if (leftDiagonalSum == 3 || rightDiagonalSum == 3) return 1;
  if (leftDiagonalSum == -3 || rightDiagonalSum == -3) return 2;
  if (leftDiagonalSum == -2 || leftDiagonalSum == 2)
    for (let i = 0; i < 3; i++)
      if (board[i][i] == 0)
        gameState = "cell" + i.toString() + i.toString();
  if (rightDiagonalSum == -2 || rightDiagonalSum == 2)
    for (let i = 0; i < 3; i++)
      if (board[i][2 - i] == 0)
        gameState = "cell" + i.toString() + (2 - i).toString();

  if (validCells.length == 0) gameState = 3;

  return gameState;
}

async function endGame(gameState) {
  currentMove = "MEOWMEOWMEOW";
  document.getElementById("infoLine").innerHTML = "";
  let scoreThisGame = 0;
  if (gameState == 1) scoreThisGame += 50;
  if (startMove == "x" && gameState != 2) scoreThisGame += 25;
  if (scoreThisGame != 0) scoreThisGame += Math.floor(Math.random() * 11) - 5;

  document.getElementById('infoLine').innerHTML = (() => {
    switch (gameState) {
      case 1: return username + " Wins!!";
      case 2: return "Computer Wins..";
      case 3: return "Its a Draw.";
    }
  })();

  localScore += scoreThisGame;

  if (userID) {
    await updateScore(userID, gameName, scoreThisGame);
    document.getElementById('score').innerHTML = "SCORE: " + await getScore(userID, gameName);
  } else {
    document.getElementById('score').innerHTML = "SCORE: " + localScore;
  }

  setTimeout(setBoard, 1250);
}

document.querySelectorAll(".cell").forEach(cell => {
  cell.onclick = () => {
    if (validCells.includes(cell.id) && currentMove == "o") {
      makeMove(cell.id);
    }
  };

  cell.onmouseover = () => {
    if (validCells.includes(cell.id) && currentMove == "o") {
      cell.style.transform = "scale(1.05)";
      cell.style.borderRadius = "15px";
    }
  }
  cell.onmouseout = () => {
    cell.style.transform = "scale(1)";
    cell.style.borderRadius = "5px";
  }
});