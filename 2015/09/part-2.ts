import { findOptimalPath } from './helpers/find-optimal-path.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

export async function solver(input: string): Promise<number> {
	const graph = parseInput(input);

	return findOptimalPath(graph, Math.max);
}

export const prompt = 'The longest route distance is';
