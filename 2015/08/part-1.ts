import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

export async function solver(input: string): Promise<number> {
	const lineInfo = parseInput(input);

	return lineInfo.codeSpace - lineInfo.memorySpace;
}

export const prompt = 'Number of characters';
