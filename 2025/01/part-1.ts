import { parseInput } from './helpers/parse-input.js';
import { modulo } from '@helpers/modulo.js';

/* ========================================================================== */

const numberOfPositions: number = 100;

/* ========================================================================== */

function solver(input: string): number {
	const instructions = parseInput(input);

	let position: number = 50;
	let count: number = 0;

	for (const instruction of instructions) {
		position = modulo(position + instruction, numberOfPositions);
		if (position === 0) count++;
	}

	return count;
}

/* ========================================================================== */

export default {
	prompt: 'Password to open the door',
	solver,
} satisfies Solution;
