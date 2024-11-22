import { LightGrid, onValue } from './helpers/light-grid.js';

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	const grid = LightGrid.createLightGrid(input);
	const endPosition = grid.columnCount - 1;

	// Ensure all four corners are switched on.
	grid.patch([
		{ position: { x: 0, y: 0 }, value: onValue },
		{ position: { x: endPosition, y: 0 }, value: onValue },
		{ position: { x: 0, y: endPosition }, value: onValue },
		{ position: { x: endPosition, y: endPosition }, value: onValue }
	]);

	// Perform 100 steps with the skip corners parameter set to true. This will
	// ensure the corner lights will never change state.
	for (let index = 0; index < 100; index++) {
		grid.step(true);
	}

	return grid.numberOfLitLights;
}

/* ========================================================================== */

export default {
	prompt: 'The number of lights on after 100 steps',
	solver
} as Solution;
