import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): number {
	const lineInfo = parseInput(input);

	return lineInfo.codeSpace - lineInfo.memorySpace;
}

/* ========================================================================== */

export default {
	prompt: 'Number of characters',
	solver
} satisfies Solution;
