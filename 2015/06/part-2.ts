import { BrightnessGrid } from './helpers/brightness-grid.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

const lightsPerRow = 1000;

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	const grid = new BrightnessGrid(lightsPerRow);

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

	return grid.totalBrightness;
}

/* ========================================================================== */

export default {
	prompt: 'Total brightness of all the lights',
	solver
} satisfies Solution;
