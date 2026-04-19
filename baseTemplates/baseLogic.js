export async function updateScore(userId, gameName, points) {
  const data = { userId: userId, game: gameName, points: points }; // Shorthand property names

  try {
    const response = await fetch('/github repos/Aplication-Programming-Project/API/scoreUpdate.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      // Logic error from the server side (e.g., database down)
      throw new Error(result.message || 'Failed to update score.');
    }

    console.log('Score updated successfully!');
    return result; // Return data so the caller can use it

  } catch (error) {
    console.error('Error in updateScore:', error.message);
    throw error; // Re-throw so the UI can handle the error state
  }
}
