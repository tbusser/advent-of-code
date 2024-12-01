import { isTriangle } from './helpers/is-triangle.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */


async function solver(input: string): Promise<number> {
	const groups = parseInput(input);

	return groups.filter(isTriangle).length;
}

/* ========================================================================== */

export default {
	prompt: 'Number of possible triangles',
	solver
} satisfies Solution;
