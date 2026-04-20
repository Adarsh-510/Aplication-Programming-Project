import { getCookie, getProfile, getScore } from '../../globalFiles/externalLogic.js'
const games = ['tictactoe', 'rockpaperscissors'];


async function profileUpdate() {
  const userID = getCookie('userID');
  const username = getCookie('username');

  if (userID) {
    let profile = await getProfile(userID);
    let dateOfCreation = profile['timeOfCreation'];
    let TTTscore = await getScore(userID, games[0]);
    let RPSscore = await getScore(userID, games[1]);

    document.getElementById('userID').innerHTML = userID;
    document.getElementById('username').innerHTML = username;
    document.getElementById('accountCreated').innerHTML = "Account created on: " + dateOfCreation;
    document.getElementById('TTTscore').innerHTML = "Highscore: " + TTTscore;
    document.getElementById('RPSscore').innerHTML = "Highscore: " + RPSscore;
  } else {
    window.location = '../Auth Pages/signin.php';
  }
};

profileUpdate();

document.getElementById('logoutButton').onclick = () => {
  document.cookie = 'userID=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  document.cookie = 'username=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

