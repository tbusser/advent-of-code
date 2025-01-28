import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): number {
	const data = parseInput(input);
	let matches: number = 0;

	data.locks.forEach(lock => {
		data.keys.forEach(key => {
			// A key fits when the combined height of the key and lock per
			// column does not exceed 5.
			matches += (key.every((height, index) => height + lock[index] < 6) ? 1 : 0);
		});
	});

	return matches;
}

/* ========================================================================== */

export default {
	prompt: 'Number of unique lock/key pairs which fit without overlap',
	solver
} satisfies Solution;
