import { optimizeRanges } from './helpers/optimize-ranges.js';
import { type Input, parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): number {
	const inventory: Input = parseInput(input);
	const optimizedRanges = optimizeRanges(inventory.ranges);

	return optimizedRanges.reduce((sum, range) => sum + (range.end - range.start) + 1, 0);
}

/* ========================================================================== */

export default {
	prompt: 'Number of fresh ingredients',
	solver
} satisfies Solution;
