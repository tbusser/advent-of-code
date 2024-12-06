import { Grid } from './helpers/guard-grid.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	const parsedInput = parseInput(input);
	const grid = Grid.createInstance(parsedInput);

	// Start with finding all the locations visited by the guard in the initial
	// area layout.
	const visitedPositions = grid.findVisitedPositions();

	// Iterate over all the visited positions. The only way to create a loop is
	// to block a position the guard will visit. So for each visited position,
	// add an obstacle and test if this creates a loop.
	return [...visitedPositions].reduce((loopCount, position) => {
		// As per description, the position of the guard can't be changed.
		if (position === grid.startPosition) return loopCount;

		if (grid.detectLoop(position)) loopCount++;

		return loopCount;
	}, 0);
}

/* ========================================================================== */

export default {
	prompt: 'The number of positions you can obstruct to create a loop is',
	solver
} satisfies Solution;
