import { countInchClaims } from './helpers/count-inch-claims.js';
import { type Input, parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): number {
	const data: Input = parseInput(input);
	const cells = countInchClaims(data.claims, data.cells);

	for (let claimIndex: number = 0; claimIndex < data.claims.length; claimIndex++) {
		let hasOverlap: boolean = false;

		for (const [start, end] of data.claims[claimIndex]) {
			for (let index: number = start; index <= end; index++) {
				if (cells[index] > 1) {
					hasOverlap = true;

					break;
				}
			}
		}

		// Claims start at ID 1, index at 0. Add 1 to get the proper ID.
		if (!hasOverlap) return claimIndex + 1;
	}

	return -1;
}

/* ========================================================================== */

export default {
	prompt: 'ID of the only claim that does not overlap',
	solver
} satisfies Solution;
