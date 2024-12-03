import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	const numberPairs = parseInput(input);

	return numberPairs.reduce((total, [a, b]) => total + (a * b), 0);
}

/* ========================================================================== */

export default {
	prompt: 'The sum of all multiplications is',
	solver
} satisfies Solution;
