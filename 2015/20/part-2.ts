import { findFactors } from './helpers/find-factors.js';

/* ========================================================================== */

function solver(input: string): number {
	const presentsGoal = Number(input);

	// Iterate over the houses, start with 1 house and keep increasing till the
	// first house with the specified number of presents has been found.
	for (let houseNumber = 1; houseNumber < Infinity; houseNumber++) {
		// Get the number of the elves that will make a stop at the
		// current house. Only elves for whom it is at most their fifth visit
		// will visit this house. Elves which have already visited 50 houses
		// will sit this one out.
		const visitingElves = findFactors(houseNumber).filter(elf => houseNumber / elf <= 50);

		// Count the number of presents which will be presented to the house.
		const numberOfPresents = visitingElves.reduce((sum, elf) => sum + (elf * 11), 0);

		if (numberOfPresents >= presentsGoal) return houseNumber;
	}

	return -1;
}

/* ========================================================================== */

export default {
	prompt: 'lowest house number to receive specified number of presents',
	solver
} satisfies Solution;
