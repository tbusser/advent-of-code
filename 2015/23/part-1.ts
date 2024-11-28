import { parseInput } from './helpers/parse-input.js';
import { Simulator } from './helpers/simulator.js';

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	const program = parseInput(input);
	const simulator = new Simulator();

	simulator.runProgram(program);

	return simulator.b;
}

/* ========================================================================== */

export default {
	prompt: 'The value register b has after the program has run is',
	solver
} satisfies Solution;
