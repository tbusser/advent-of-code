import { type Input, parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

const lowerCaseACode = 97;

/* ========================================================================== */

function inspectBox(box: string): [hasTwo: boolean, hasThree: boolean] {
	const frequency = new Uint8Array(26);

	for (const char of box) {
		frequency[char.charCodeAt(0) - lowerCaseACode]++;
	}

	let hasTwo: boolean = false;
	let hasThree: boolean = false;
	for (let index: number = 0; index < 26; index++) {
		if (frequency[index] === 2) hasTwo = true;
		if (frequency[index] === 3) hasThree = true;

		if (hasTwo && hasThree) break;
	}

	return [hasTwo, hasThree];
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
