import { calculateMaximumHappiness } from './helpers/calculate-max-happiness.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	const graph = parseInput(input);

	return calculateMaximumHappiness(graph);
}

/* ========================================================================== */

export default {
	prompt: 'total change in happiness',
	solver
} satisfies Solution;
