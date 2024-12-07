import { Equation } from './types.js';

/* ========================================================================== */

export function parseInput(input: string): Equation[] {
	const lines = input.split('\n');

	return lines.map(line => {
		const [testValue, numbers] = line.split(': ');

		return {
			testValue: Number(testValue),
			numbers: numbers.split(' ').map(Number)
		};
	});
}
