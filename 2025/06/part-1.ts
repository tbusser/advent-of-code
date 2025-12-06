import { type Input, parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): number {
	const data: Input = parseInput(input);
	let sum: number = 0;

	function solveIndex(index: number): number {
		return (data.operator[index] === '+')
			? data.line1[index] + data.line2[index] + data.line3[index] + data.line4[index]
			: data.line1[index] * data.line2[index] * data.line3[index] * data.line4[index];
	}

	for (let index = 0; index < data.operator.length; index++) {
		sum += solveIndex(index);
	}

	return sum;
}

/* ========================================================================== */

export default {
	prompt: 'Grand total',
	solver
} satisfies Solution;
