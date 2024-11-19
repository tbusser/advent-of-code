import { findOptimalPath } from './helpers/find-optimal-path.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	const graph = parseInput(input);

	return findOptimalPath(graph, Math.max);
}

/* ========================================================================== */

export default {
	prompt: 'The longest route distance is',
	solver
} satisfies Solution;
