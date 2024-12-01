import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	const [left, right] = parseInput(input);

	return left.reduce<number>(
		(total, locationId, index) => total + Math.abs(locationId - right[index]),
		0
	);
}

/* ========================================================================== */

export default {
	prompt: 'The total distance between the lists',
	solver
} satisfies Solution;
