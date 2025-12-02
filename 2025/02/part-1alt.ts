/*
 |------------------------------------------------------------------------------
 | Alternative part 1 solution
 |------------------------------------------------------------------------------
 |
 | After implementing my first solution I figured a solution without using
 | strings should be possible. This is the solution using only numbers.
 |
 |*/
import { type Input, parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function digitsInNumber(value: number): number {
	return Math.log(value) * Math.LOG10E + 1 | 0;
}

/* -------------------------------------------------------------------------- */

function solver(input: string): number {
	const ranges: Input = parseInput(input);
	let total: number = 0;

	for (const [start, end] of ranges) {
		for (let id: number = start; id <= end; id++) {
			// IDs with an odd number of digits are always valid, skip them.
			if (digitsInNumber(id) % 2 === 1) continue;

			const halfDigitPowerOfTen: number = Math.pow(10, digitsInNumber(id) / 2);
			// Get the first batch x digits of the number.
			// Example: 11223344 -> 1122
			// Use "0 |"" to force the result to a whole number.
			const firstHalf: number = 0 | (id / halfDigitPowerOfTen);
			// Get the second batch of x digits.
			// Example: 11223344 -> 3344
			const secondHalf: number = id - (firstHalf * halfDigitPowerOfTen);

			// When the first and second half are the same, it is a invalid id.
			if (firstHalf === secondHalf) total += id;
		}
	}

	return total;
}

/* ========================================================================== */

export default {
	prompt: 'Sum of the invalid IDs',
	solver
} satisfies Solution;
