import { readOutNumberOfTimes } from './helpers/read-out.js';

/* ========================================================================== */

function solver(input: string): number {
	const result = readOutNumberOfTimes(input, 50);

	return result.length;
}

/* ========================================================================== */

export default {
	prompt: 'The length of the result after 50 iterations',
	solver
} satisfies Solution;
