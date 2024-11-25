import { findFactors } from './helpers/find-factors.js';

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	// Each elf gives 10 times the number of presents as his/her number. If we
	// divide the input by 10 each elf gives 1 time the number of presents as
	// his/her number and we a lower target to find a solution to.
	const presentsGoal = Number(input) / 10;

	// Iterate over the houses, start with 1 house and keep increasing till the
	// first house with the specified number of presents has been found.
	for (let houseNumber = 1; houseNumber < Infinity; houseNumber++) {
		const visitingElves = findFactors(houseNumber);
		const numberOfPresents = visitingElves.reduce((sum, count) => sum + count, 0);

		if (numberOfPresents >= presentsGoal) return houseNumber;
	}

	return -1;
}

/* ========================================================================== */

export default {
	prompt: 'lowest house number to receive specified number of presents',
	solver
} satisfies Solution;
