import { type Input, parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): number {
	const inventory: Input = parseInput(input);
	let freshCount: number = 0;

	for (const ingredient of inventory.ingredients) {
		if (inventory.ranges.some(range => range.start <= ingredient && range.end >= ingredient)) freshCount++;
	}

	return freshCount;
}

/* ========================================================================== */

export default {
	prompt: 'Number of fresh ingredients',
	solver
} satisfies Solution;
