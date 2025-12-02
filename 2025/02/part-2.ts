import { type Input, parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

/**
 * A regex which will match a group of digits repeating from the beginning to
 * the end of the input.
 */
const regex: RegExp = /^(\d+)(?:\1)+$/;

function solver(input: string): number {
	const ranges: Input = parseInput(input);
	let total: number = 0;

	for (const [start, end] of ranges) {
		for (let id: number = start; id <= end; id++) {
			if (regex.test(id.toString())) total += id;
		}
	}

	return total;
}

/* ========================================================================== */

export default {
	prompt: 'Sum of the invalid IDs',
	solver
} satisfies Solution;
