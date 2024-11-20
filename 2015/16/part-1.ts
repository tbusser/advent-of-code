import { parseInput } from './helpers/parse-input.js';
import { profile } from './helpers/profile.js';

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	const aunts = parseInput(input);

	for (const [index, aunt] of aunts.entries()) {
		const isMatch = Object.keys(aunt).every(key => aunt[key] === profile[key]);
		if (isMatch) return index + 1;
	}

	return -1;
}

/* ========================================================================== */

export default {
	prompt: 'The number of the Sue that got me the gift is',
	solver
} satisfies Solution;
