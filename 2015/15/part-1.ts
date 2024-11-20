import { findBestScoringCookie } from './helpers/find-cookie.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	const ingredients = parseInput(input);

	return findBestScoringCookie(ingredients, 100);
}

/* ========================================================================== */

export default {
	prompt: 'Total score of highest-scoring cookie',
	solver
} satisfies Solution;
