import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	const parsedInput = parseInput(input);

	return -1;
}

/* ========================================================================== */

export default {
	prompt: 'placeholder prompt',
	solver
} satisfies Solution;
