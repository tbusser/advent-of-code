import { parseInput } from './helpers/parse-input.js';
import { Simulator } from './helpers/simulator.js';

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	const program = parseInput(input);
	const simulator = new Simulator(1);

	simulator.runProgram(program);

	return simulator.b;
}

/* ========================================================================== */

export default {
	prompt: 'The value register b has after the program has run and a starts at 1 is',
	solver
} satisfies Solution;
