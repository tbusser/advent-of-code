export function getWinningScore(players: number, maxMarbleValue: number): number {
	const playerScores: number[] = new Array(players).fill(0);

	// Seed the board with the 0 marble
	let board: number[] = [0];
	let position: number = 0;
	for (let value: number = 1; value <= maxMarbleValue; value++) {
		// Marbles with a value divisible by 23 need special handling.
		if (value % 23 === 0) {
			// Based on the current marble we can determine which player has
			// played this marble.
			const currentPlayer = value % players;
			// Add the marble value plus the value of the marble 7 positions
			// back to the score of the current player.
			playerScores[currentPlayer] += value + board.splice(position - 7, 1)[0];
			// The position becomes the marble after the just removed marble. If
			// the position becomes negative, wrap around to the back of
			// the board.
			position -= 7;
			if (position < 0) {
				position = (board.length + 1) + position;
			}
			continue;
		}

		let newPosition = position + 2;

		// If the new position is 1 beyond the current size of the board, add
		// the marble at the end.
		if (newPosition === board.length) {
			board.push(value);
		} else {
			// The marble has to be wrapped around to the start of the board
			// and inserted at the position.
			newPosition %= board.length;
			const before = board.slice(0, newPosition);
			const after = board.slice(newPosition);
			board = [...before, value, ...after];
		}

		position = newPosition;
	}

	// Return the highest score of all players.
	return Math.max(...playerScores);
}
