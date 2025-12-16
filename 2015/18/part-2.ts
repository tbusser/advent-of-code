import { LightGrid } from './helpers/light-grid.js';

/* ========================================================================== */

function solver(input: string): number {
	const grid = LightGrid.createLightGrid(input, true);

	// Perform 100 steps with the skip corners parameter set to true. This will
	// ensure the corner lights will never change state.
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
