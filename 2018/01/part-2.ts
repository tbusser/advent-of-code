import { type Input, parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): number {
	const changes: Input = parseInput(input);
	const frequencySet = new Set<number>();
	const numberOfChanges: number = changes.length;

	let frequency: number = 0;
	let index: number = 0;

	while (true) {
		frequency += changes[index];

		if (frequencySet.has(frequency)) return frequency;

		frequencySet.add(frequency);
		index = (index + 1) % numberOfChanges;
	}
}

/* ========================================================================== */

export default {
	prompt: 'First frequency to be reached twice',
	solver
} satisfies Solution;
