import { ChronospatialComputer } from './helpers/chronospatial-computer.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): number {
	const data = parseInput(input);
	const computer = new ChronospatialComputer({ a: 0, b: 0, c: 0 });

	const expectedResult = data.program.join(',');

	let answer: number = 0;
	let output: string;

	// Go backwards through the program and lock in each value back to front.
	for (let index = data.program.length - 1; index >= 0; index--) {

		const aBase: number = Math.pow(8, index);
		const expectedEnding = expectedResult.substring(index * 2);

		let counter: number = 0;

		// It is possible for the last output of the previous index to already
		// have the correct digit in place for the current index. In this case
		// there is no need to run the program and get a new output value.
		while (output === undefined || output.substring(index * 2) !== expectedEnding) {
			computer.setRegisters({ a: answer + aBase * ++counter });
			output = computer.runProgram(data.program);
		}

		answer += aBase * counter;
	}

	return answer;
}

/* ========================================================================== */

export default {
	prompt: 'The lowest initial value for A is',
	solver
} satisfies Solution;
