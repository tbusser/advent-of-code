import { type Input, parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function findJoltageFor(cardinal: number, bank: number[]) {
	let findCardinal: boolean = true;
	let secondDigit: number | undefined = undefined;

	for (let index: number = 0; index < bank.length; index++) {
		if (bank[index] === cardinal && findCardinal) {
			findCardinal = false;
			continue;
		}
		if (!findCardinal && (secondDigit === undefined || bank[index] > secondDigit)) {
			secondDigit = bank[index];
		}
	}

	return secondDigit === undefined
		? undefined
		: (cardinal * 10) + secondDigit;
}

/* -------------------------------------------------------------------------- */

function solver(input: string): number {
	const banks: Input = parseInput(input);

	let totalJoltage: number = 0;

	for (const bank of banks) {
		for (let index: number = 9; index > 0; index--) {
			const joltage: number | undefined = findJoltageFor(index, bank);
			if (joltage !== undefined) {
				totalJoltage += joltage;
				break;
			}
		}
	}

	return totalJoltage;
}

/* ========================================================================== */

export default {
	prompt: 'Total output of joltage',
	solver
} satisfies Solution;
