import { parseInput } from './helpers/parse-input.js';
import { findCombinations } from './helpers/find-combinations.js';

/* ========================================================================== */

const totalVolume = 150;

/* ========================================================================== */

function solver(input: string): number {
	const containers = parseInput(input);
	let combinations = 0;

	findCombinations(containers, totalVolume, () => combinations++);

	return combinations;
}

/* ========================================================================== */

export default {
	prompt: 'The number of different container combinations is',
	solver
} satisfies Solution;
