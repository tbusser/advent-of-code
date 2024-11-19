import { readOutNumberOfTimes } from './helpers/read-out.js';

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	const result = readOutNumberOfTimes(input, 40);

	return result.length;
}

/* ========================================================================== */

export default {
	prompt: 'The length of the result after 40 iterations',
	solver
} satisfies Solution;
