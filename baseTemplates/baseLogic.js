export async function updateScore(userId, gameName, points) {
  const data = { userId: userId, game: gameName, points: points };

  const response = await fetch('/github repos/Aplication-Programming-Project/API/scoreUpdate.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

export async function getScore(userId, gameName) {
  const data = { userId: userId, game: gameName, points: points };

  const response = await fetch('/github repos/Aplication-Programming-Project/API/getScore.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return
}