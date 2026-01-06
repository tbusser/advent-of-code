import { LazyMap } from '@helpers/LazyMap.js';
import { type Input, parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function inspectBox(box: string): [boolean, boolean] {
	const letterMap = new LazyMap<string, number>(() => 0);

	for (const char of box) {
		letterMap.set(char, letterMap.get(char) + 1);
	}

	const occurrences = letterMap.values().toArray();

	return [
		occurrences.some(count => count === 2),
		occurrences.some(count => count === 3)
	];
}

function solver(input: string): number {
	const boxes: Input = parseInput(input);

	let twoCount = 0;
	let threeCount = 0;
	for (const box of boxes) {
		const [hasTwo, hasThree] = inspectBox(box);
		if (hasTwo) twoCount++;
		if (hasThree) threeCount++;
	}

	return twoCount * threeCount;
}

/* ========================================================================== */

export default {
	prompt: 'placeholder prompt',
	solver
} satisfies Solution;
