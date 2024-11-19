import { Circuit } from './helpers/circuit.js';
import { parseInput } from './helpers/parse-input.js';
import { AssignmentInstruction, Instruction } from './helpers/types.js';

/* ========================================================================== */

function patchAssignmentValue(instructions: Instruction[], wire: string, value: number) {
	const instruction = instructions.find(
		instruction => instruction.type === 'assignment' && instruction.output === wire
	);
	(instruction as AssignmentInstruction).input = value;
}

/* -------------------------------------------------------------------------- */

async function solver(input: string): Promise<number> {
	const instructions = parseInput(input);
	const circuit = new Circuit();

	// Follow the instructions and get the signal of wire A.
	circuit.followInstructions(instructions);
	const signalA = circuit.getWireSignal('a');
	// Patch the value of the assignment to the B wire with the signal of
	// wire A.
	patchAssignmentValue(instructions, 'b', signalA);
	// Reset the state of the circuit to its initial state.
	circuit.reset();
	// Follow the instructions, this time with the patched value for wire B.
	circuit.followInstructions(instructions);

	// Return the answer.
	return circuit.getWireSignal('a') ?? -1;
}

/* ========================================================================== */

export default {
	prompt: 'Signal provided to wire A',
	solver
} satisfies Solution;
