import { findCombinations } from './helpers/find-combinations.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

const totalVolume = 150;

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	const containers = parseInput(input);
	const result = {
		containerCount: Infinity,
		count: 0
	};

	findCombinations(containers, totalVolume, solution => {
		if (solution.length > result.containerCount) return;

		if (solution.length === result.containerCount) {
			result.count++;

			return;
		}

		result.containerCount = solution.length;
		result.count = 1;
	});

	return result.count;
}

/* ========================================================================== */

export default {
	prompt: 'The number of different ways is',
	solver
} satisfies Solution;
