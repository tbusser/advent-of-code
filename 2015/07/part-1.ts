import { Circuit } from './helpers/circuit.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): number {
	const instructions = parseInput(input);
	const circuit = new Circuit();

	circuit.followInstructions(instructions);

	return circuit.getWireSignal('a') ?? -1;
}

/* ========================================================================== */

export default {
	prompt: 'Signal provided to wire A',
	solver
} satisfies Solution;
