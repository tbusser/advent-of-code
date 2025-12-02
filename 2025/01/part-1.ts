import { parseInput } from './helpers/parse-input.js';
import { modulo } from '@helpers/math.js';

/* ========================================================================== */

const numberOfPositions: number = 100;

/* ========================================================================== */

function solver(input: string): number {
	const rotations: number[] = parseInput(input);

	let position: number = 50;
	let count: number = 0;

	for (const distance of rotations) {
		position = modulo(position + distance, numberOfPositions);
		if (position === 0) count++;
	}

	return count;
}

/* ========================================================================== */

export default {
	prompt: 'Password to open the door',
	solver,
} satisfies Solution;
