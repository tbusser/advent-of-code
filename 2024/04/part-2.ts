import { Grid } from './helpers/xmas-grid.js';

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	const grid = Grid.createInstance(input);

	return grid.countCrossMas();
}

/* ========================================================================== */

export default {
	prompt: 'Number of times an X-MAS appears',
	solver
} satisfies Solution;
