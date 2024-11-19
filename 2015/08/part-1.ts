import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	const lineInfo = parseInput(input);

	return lineInfo.codeSpace - lineInfo.memorySpace;
}

/* ========================================================================== */

export default {
	prompt: 'Number of characters',
	solver
} satisfies Solution;
