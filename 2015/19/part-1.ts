import { MachineInput, parseInput } from './helpers/parse-input.js';
import { getMutations } from './helpers/get-mutations.js';

/* ========================================================================== */

function countNumberOfMutations(machineInput: MachineInput): number {
	const mutations = new Set<string>();

	machineInput.replacements.forEach(({ replacement, sequence }) => {
		for (const mutation of getMutations(machineInput.medicineMolecule, sequence, replacement)) {
			mutations.add(mutation);
		}
	});

	return mutations.size;
}

/* ========================================================================== */

function solver(input: string): number {
	const machineInput = parseInput(input);

	return countNumberOfMutations(machineInput);
}

/* ========================================================================== */

export default {
	prompt: 'Number of distinct molecules',
	solver
} satisfies Solution;
