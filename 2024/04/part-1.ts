import { Grid } from './helpers/xmas-grid.js';

/* ========================================================================== */

function solver(input: string): number {
	const grid = Grid.createInstance(input);

	return grid.countXmas();

}

/* ========================================================================== */

export default {
	prompt: 'The number of times XMAS appears is',
	solver
} satisfies Solution;
