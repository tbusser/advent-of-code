import { readOutNumberOfTimes } from './helpers/read-out.js';

/* ========================================================================== */

function solver(input: string): number {
	const result = readOutNumberOfTimes(input, 40);

	return result.length;
}

/* ========================================================================== */

export default {
	prompt: 'The length of the result after 40 iterations',
	solver
} satisfies Solution;
