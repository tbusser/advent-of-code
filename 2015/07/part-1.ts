import { Circuit } from './helpers/circuit.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

export async function solver(input: string): Promise<number> {
	const instructions = parseInput(input);
	const circuit = new Circuit();

	circuit.followInstructions(instructions);

	return circuit.getWireSignal('a') ?? -1;
}

export const prompt = 'Signal provided to wire A';
