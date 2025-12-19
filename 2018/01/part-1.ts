import { type Input, parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): number {
	const changes: Input = parseInput(input);

	let frequency: number = 0;
	for (let index = 0; index < changes.length; index++) {
		frequency += changes[index];
	}

	return frequency;
}

/* ========================================================================== */

export default {
	prompt: 'The resulting frequency is',
	solver
} satisfies Solution;
