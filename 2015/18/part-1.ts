import { LightGrid } from './helpers/light-grid.js';

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	const grid = LightGrid.createLightGrid(input);

	for (let index = 0; index < 100; index++) {
		grid.step();
	}

	return grid.numberOfLitLights;
}

/* ========================================================================== */

export default {
	prompt: 'The number of lights on after 100 steps',
	solver
} as Solution;
