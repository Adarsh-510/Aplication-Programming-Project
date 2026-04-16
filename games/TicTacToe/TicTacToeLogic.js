const moves = ["x", "o"];
const startMove = moves[Math.floor(Math.random() * 2)];
let currentMove = startMove;
let board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let validCells = ["cell00", "cell01", "cell02", "cell10", "cell11", "cell12", "cell20", "cell21", "cell22"];

updateInfoLine(0);
if (currentMove == "x") makeRandomMove();

function makeMove(cell) {
  validCells.splice(validCells.indexOf(cell), 1);
  document.getElementById(cell).innerHTML = currentMove;
  board[cell[4]][cell[5]] = (currentMove == "x") ? -1 : 1;
  currentMove = (currentMove == "x") ? "o" : "x";
  if (updateInfoLine(checkBoard())) {
    if (currentMove == "x") makeRandomMove();
  } else currentMove = "MEOWMEOWMEOW";
}

function makeRandomMove() {
  setTimeout(function() {
    makeMove(validCells[Math.floor(Math.random() * validCells.length)]);
  }, 1000);
}

function checkBoard() {
  let rowSum;
  for (let i = 0; i < 3; i++){
    rowSum = 0;
    for (let j = 0; j < 3; j++){
      rowSum += board[i][j];
    }
    if (rowSum == 3) return 1;
    if (rowSum == -3) return 2;
  }

  let colSum;
  for (let i = 0; i < 3; i++){
    colSum = 0;
    for (let j = 0; j < 3; j++){
      colSum += board[j][i];
    }
    if (colSum == 3) return 1;
    if (colSum == -3) return 2;
  }

  let leftDiagonalSum = 0, rightDiagonalSum = 0;
  for (let i = 0; i < 3; i++){
    leftDiagonalSum += board[i][i];
    rightDiagonalSum += board[i][2 - i];
  }
  if (leftDiagonalSum == 3 || rightDiagonalSum == 3) return 1;
  if (leftDiagonalSum == -3 || rightDiagonalSum == -3) return 2;

  if (validCells.length == 0) return 3;

  return 0;
}

function updateInfoLine(gameState) {
  if (gameState == 0) {
    document.getElementById("infoLine").innerHTML = (currentMove == "o") ? "CURRENT TURN: PLAYER" : "CURRENT TURN: COMPUTER";
    return true;
  } else if (gameState == 1) { 
    document.getElementById("infoLine").innerHTML = "PLAYER WON!";
  } else if (gameState == 2) { 
    document.getElementById("infoLine").innerHTML = "COMPUTER WON!";
  } else if (gameState == 3) { 
    document.getElementById("infoLine").innerHTML = "IT'S A TIE!";
  }
  return false;
}

document.querySelectorAll(".cell").forEach(cell => {
    cell.onclick = () => {
        if (validCells.includes(cell.id) && currentMove == "o") {
            makeMove(cell.id);
        }
    };
});
