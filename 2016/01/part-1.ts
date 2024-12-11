import { followRoute } from './helpers/follow-directions.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): number {
	const route = parseInput(input);
	const path = followRoute(route);
	const endPoint = path.at(-1);

	return Math.abs(endPoint.x) + Math.abs(endPoint.y);
}

/* ========================================================================== */

export default {
	prompt: 'Number of blocks away from Easter Bunny HQ',
	solver
} satisfies Solution;
