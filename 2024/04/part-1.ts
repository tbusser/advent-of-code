import { Grid } from './helpers/xmas-grid.js';

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	const grid = Grid.createInstance(input);

	return grid.countXmas();

}

/* ========================================================================== */

export default {
	prompt: 'The number of times XMAS appears is',
	solver
} satisfies Solution;
