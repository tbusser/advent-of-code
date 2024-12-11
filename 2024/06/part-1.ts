import { Grid } from './helpers/guard-grid.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): number {
	const parsedInput = parseInput(input);
	const grid = Grid.createInstance(parsedInput);

	return grid.findVisitedPositions().size;
}

/* ========================================================================== */

export default {
	prompt: 'Number of distinct position visited by the guard before leaving the area',
	solver
} satisfies Solution;
