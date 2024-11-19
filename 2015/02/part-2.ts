import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

export async function solver(input: string): Promise<number> {
	const gifts = parseInput(input);

	const feetOfRibbon = gifts.reduce((total, { height, length, width }) => {
		// Sort the sides in ascending order, this way the smallest sides are at
		// the front of the array.
		const sides = [length, width, height].sort((a, b) => a - b);

		// Calculate the volume and the length of ribbon needed for the bow.
		const volume = length * width * height;
		const ribbonLength = sides.at(0) * 2 + sides.at(1) * 2;

		return total + ribbonLength + volume;
	}, 0);

	return feetOfRibbon;
}

/* -------------------------------------------------------------------------- */

export default {
	prompt: 'How many total feet of ribbon should they order?',
	solver
} satisfies Solution;
