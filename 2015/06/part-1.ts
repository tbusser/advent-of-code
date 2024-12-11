import { Grid } from './helpers/grid.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

const lightsPerRow = 1000;

/* ========================================================================== */

function solver(input: string): number {
	const grid = new Grid(lightsPerRow);

	const instructions = parseInput(input);

	instructions.forEach(instruction => {
		switch (instruction.action) {
			case 'toggle':
				grid.toggle(instruction.range);
				break;

			case 'turn on':
				grid.turnOn(instruction.range);
				break;

			case 'turn off':
				grid.turnOff(instruction.range);
				break;
		}

	});

	return grid.numberOfLitLights;
}

/* ========================================================================== */

export default {
	prompt: 'Number of lit lights',
	solver
} satisfies Solution;
