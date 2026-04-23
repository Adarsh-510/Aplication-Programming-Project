export async function updateScore(userID, gameName, points) {
  const data = { userID: userID, game: gameName, points: points };

  const response = await fetch('/Aplication-Programming-Project/API/scoreUpdate.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

export async function getScores(userID) {
  const data = { userID: userID };

  const response = await fetch('/Aplication-Programming-Project/API/getScores.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const result = await response.json();

  return result.scores;
}

export function getCookie(name) {
  const cDecoded = decodeURIComponent(document.cookie);
  const cArray = cDecoded.split("; ");
  let result = "";

  cArray.forEach(element => {
    if (element.indexOf(name) == 0) {
      result = element.substring(name.length + 1);
    }
  });
  return result;
}

export async function getProfile(userID) {
  const data = { userID: userID };

  const response = await fetch('/Aplication-Programming-Project/API/getProfile.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const result = await response.json();

  return result.profile;
}

export async function getLeaderboard(gameName) {
  const data = { gameName: gameName };

  const response = await fetch('/Aplication-Programming-Project/API/getLeaderboard.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const result = await response.json();

  return result.scores;
}