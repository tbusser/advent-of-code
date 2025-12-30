type Node = {
	value: number;
	next: Node;
	previous: Node;
};

/* ========================================================================== */

export function getWinningScore(players: number, maxMarbleValue: number): number {
	const playerScores: number[] = new Array(players).fill(0);

	// Initialize the current node.
	let currentNode: Node = {
		value: 0,
		next: null,
		previous: null
	};
	currentNode.next = currentNode;
	currentNode.previous = currentNode;

	for (let value: number = 1; value <= maxMarbleValue; value++) {
		// Marbles with a value divisible by 23 need special handling.
		if (value % 23 === 0) {
			// Based on the current marble we can determine which player has
			// played this marble.
			const currentPlayer = (value - 1) % players;
			playerScores[currentPlayer] += value;
			const nodeToRemove = currentNode.previous.previous.previous.previous.previous.previous.previous;
			playerScores[currentPlayer] += nodeToRemove.value;
			nodeToRemove.previous.next = nodeToRemove.next;
			nodeToRemove.next.previous = nodeToRemove.previous;

			currentNode = nodeToRemove.next;

			continue;
		}

		const parentNode = currentNode.next;
		const newNode = {
			value,
			next: parentNode.next,
			previous: parentNode
		};
		parentNode.next.previous = newNode;
		parentNode.next = newNode;
		currentNode = newNode;
	}

	// Return the highest score of all players.
	return Math.max(...playerScores);
}
