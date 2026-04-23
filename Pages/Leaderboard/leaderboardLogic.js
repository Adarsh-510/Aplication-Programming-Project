import { getLeaderboard } from "../../globalFiles/externalLogic.js";

const table = document.getElementById('leaderboardDisplay');
const gameNames = ['tictactoe', 'rockpaperscissors', 'matchcards', 'memorygame', 'total'];

async function refreshLeaderBoards() {
  const sortBy = window.location.hash.substring(1) || 4;
  console.log(sortBy);

  const tableData = await getLeaderboard(gameNames[sortBy]);
  table.innerHTML = `<tr>
      <th> Rank</th>
      <th>Username</th>
      <th><a href="#0">Tic-Tac-Toe</a></th>
      <th><a href="#1">Rock Paper Scissors</a></th>
      <th><a href="#2">Match the Cards</a></th>
      <th><a href="#3">Memory Game</a></th>
      <th><a href="#4">Total</a></th>
    </tr>`

  tableData.forEach((row, i) => {
    table.innerHTML += `
    <tr>
      <td>${i + 1}</td>
      <td>${row['userID']}</td>
      <td>${row[gameNames[0]]}</td>
      <td>${row[gameNames[1]]}</td>
      <td>${row[gameNames[2]]}</td>
      <td>${row[gameNames[3]]}</td>
      <td>${row[gameNames[4]]}</td>
    </tr>`
  });
} refreshLeaderBoards();

addEventListener("hashchange", (event) => {
  refreshLeaderBoards();
});