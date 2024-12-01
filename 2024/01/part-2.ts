import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	const [left, right] = parseInput(input);
	const locationCount: Record<number, number> = {};

	// Iterate over all the location IDs and count how many times that location
	// ID is present in the list.
	right.forEach(locationId => {
		locationCount[locationId] = (locationCount[locationId] ?? 0) + 1;
	});

	return left.reduce<number>(
		(total, locationId) => total + (locationId * (locationCount[locationId] ?? 0)),
		0
	);
}

/* ========================================================================== */

export default {
	prompt: 'Their similarity score is',
	solver
} satisfies Solution;
