import { getCookie, getProfile, getScores } from '../../globalFiles/externalLogic.js'
const games = ['tictactoe', 'rockpaperscissors', 'matchcards', 'memorygame'];

async function profileUpdate() {
  const userID = getCookie('userID');
  const username = getCookie('username');
  const scores = await getScores(userID);

  if (userID) {
    let profile = await getProfile(userID);
    let dateOfCreation = profile['timeOfCreation'];

    document.getElementById('userID').innerHTML = userID;
    document.getElementById('username').innerHTML = username;
    document.getElementById('accountCreated').innerHTML = "Account created on: " + dateOfCreation;

    document.getElementById('TTTscore').innerHTML = "Highscore: " + scores[games[0]];
    document.getElementById('RPSscore').innerHTML = "Highscore: " + scores[games[1]];
    document.getElementById('MTCscore').innerHTML = "Highscore: " + scores[games[2]];
    document.getElementById('MGscore').innerHTML = "Highscore: " + scores[games[3]];
  } else {
    window.location = '../Auth Pages/signin.html';
  }
};

profileUpdate();

document.getElementById('logoutButton').onclick = () => {
  document.cookie = 'userID=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  document.cookie = 'username=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

