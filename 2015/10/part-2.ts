import { readOutNumberOfTimes } from './helpers/read-out.js';

/* ========================================================================== */

export async function solver(input: string): Promise<number> {
	const result = readOutNumberOfTimes(input, 50);

	return result.length;
}

export const prompt = 'The length of the result after 50 iterations';
