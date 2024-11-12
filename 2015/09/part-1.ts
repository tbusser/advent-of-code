import { findOptimalPath } from './helpers/find-optimal-path.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

export async function solver(input: string): Promise<number> {
	const graph = parseInput(input);

	return findOptimalPath(graph, Math.min);
}

export const prompt = 'The shortest route distance is';
