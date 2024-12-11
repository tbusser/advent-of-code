import { calculateTargetWeight } from './helpers/calculate-target-weight.js';
import { findLowestEntanglement } from './helpers/find-lowest-entanglement.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): number {
	const packages = parseInput(input);
	const targetWeightForGroup = calculateTargetWeight(packages, 4);

	return findLowestEntanglement(packages, targetWeightForGroup);
}

/* ========================================================================== */

export default {
	prompt: 'The quantum entanglement of the first group is',
	solver
} satisfies Solution;
