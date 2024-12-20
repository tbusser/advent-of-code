import { ChronospatialComputer } from './helpers/chronospatial-computer.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): string {
	const data = parseInput(input);
	const computer = new ChronospatialComputer(data.registers);

	return computer.runProgram(data.program);
}

/* ========================================================================== */

export default {
	prompt: 'The output of the program is',
	solver
} satisfies Solution<string>;
