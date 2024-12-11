import { Grid } from './helpers/xmas-grid.js';

/* ========================================================================== */

function solver(input: string): number {
	const grid = Grid.createInstance(input);

	return grid.countCrossMas();
}

/* ========================================================================== */

export default {
	prompt: 'Number of times an X-MAS appears',
	solver
} satisfies Solution;
