import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

export async function solver(input: string): Promise<number> {
	const gifts = parseInput(input);

	const squareFeet = gifts.reduce((total, { height, length, width }) => {
		const sides = [length * width, width * height, height * length];
		const smallestSide = Math.min(...sides);

		const squareFeet =
			sides.reduce((total, side) => total + 2 * side, 0) + smallestSide;

		return total + squareFeet;
	}, 0);

	return squareFeet;
}

/* -------------------------------------------------------------------------- */

export default {
	prompt: 'How many total square feet of wrapping paper should they order?',
	solver
} satisfies Solution;
