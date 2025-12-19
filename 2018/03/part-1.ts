import { type Input, parseInput } from './helpers/parse-input.js';

import { countInchClaims } from './helpers/count-inch-claims.js';

/* ========================================================================== */

function solver(input: string): number {
	const data: Input = parseInput(input);
	const cells = countInchClaims(data.claims, data.cells);

	let count: number = 0;
	for (let index: number = 0; index < cells.length; index++) {
		if (cells[index] >= 2) count++;
	}

	return count;
}

/* ========================================================================== */

export default {
	prompt: 'Square inches of fabric with at least two claims',
	solver
} satisfies Solution;
