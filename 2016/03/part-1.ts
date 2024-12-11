import { isTriangle } from './helpers/is-triangle.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */


function solver(input: string): number {
	const groups = parseInput(input);

	return groups.filter(isTriangle).length;
}

/* ========================================================================== */

export default {
	prompt: 'Number of possible triangles',
	solver
} satisfies Solution;
