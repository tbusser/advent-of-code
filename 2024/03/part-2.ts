import { parseInputWithConditionals } from './helpers/parse-input.js';

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	const numberPairs = parseInputWithConditionals(input);

	return numberPairs.reduce((total, [a, b]) => total + (a * b), 0);
}

/* ========================================================================== */

export default {
	prompt: 'The sum of only the enabled multiplications is',
	solver
} satisfies Solution;
