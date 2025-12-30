export function getWinningScore(players: number, maxMarbleValue: number): number {
	const playerScores: number[] = new Array(players).fill(0);

	// The index in the array is the marble value, the value at the index is the
	// next or previous marble value.
	const next = new Uint32Array(maxMarbleValue + 1);
	const previous = new Uint32Array(maxMarbleValue + 1);

	// Initialize the current node.
	let currentMarble: number = 0;

	for (let marbleValue: number = 1; marbleValue <= maxMarbleValue; marbleValue++) {
		// Marbles with a value divisible by 23 need special handling.
		if (marbleValue % 23 === 0) {
			// Based on the current marble we can determine which player has
			// played this marble.
			const currentPlayer = (marbleValue - 1) % players;
			// Set current marble to the seven positions back.
			currentMarble = previous[previous[previous[previous[previous[previous[previous[currentMarble]]]]]]];
			// Update the score of the player.
			playerScores[currentPlayer] += currentMarble + marbleValue;

			// Get the previous and next marble for the current marble.
			const nextMarble = next[currentMarble];
			const previousMarble = previous[currentMarble];

			// Connect the next and previous marble, removing the current marble
			// from the board.
			next[previousMarble] = nextMarble;
			previous[nextMarble] = previousMarble;

			// Update the current marble.
			currentMarble = nextMarble;

			continue;
		}

		// The new marble has to be inserted after the next marble of the
		// current marble.
		// E.g.: toBePrevious <-> toBeNext
		const toBePrevious = next[currentMarble];
		const toBeNext = next[toBePrevious];

		// Link toBePrevious as the previous marble of marble value.
		// E.g.: toBePrevious <-> marbleValue
		next[toBePrevious] = marbleValue;
		previous[marbleValue] = toBePrevious;

		// Link toBeNext as the next marble of marble value.
		// E.g.: toBePrevious <-> marbleValue <-> toBeNext
		next[marbleValue] = toBeNext;
		previous[toBeNext] = marbleValue;

		// Update the current marble.
		currentMarble = marbleValue;
	}

	// Return the highest score of all players.
	return Math.max(...playerScores);
}
