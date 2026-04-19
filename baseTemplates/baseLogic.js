export async function updateScore(userID, gameName, points) {
  const data = { userID: userID, game: gameName, points: points };

  const response = await fetch('/github repos/Aplication-Programming-Project/API/scoreUpdate.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

export async function getScore(userID, gameName) {
  const data = { userID: userID, game: gameName };

  const response = await fetch('/github repos/Aplication-Programming-Project/API/getScore.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const result = await response.json();

  return result.score;
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