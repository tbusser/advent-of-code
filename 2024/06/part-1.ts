import { Grid } from './helpers/guard-grid.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	const parsedInput = parseInput(input);
	const grid = Grid.createInstance(parsedInput);

	return grid.countVisitedPositions();
}

/* ========================================================================== */

export default {
	prompt: 'Number of distinct position visited by the guard before leaving the area',
	solver
} satisfies Solution;
