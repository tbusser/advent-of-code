import { findNumber } from './helpers/find-number.js';

/* ========================================================================== */

function solver(input: string): number {
	return findNumber(input, 5);
}

/* -------------------------------------------------------------------------- */

export default {
	prompt: 'The lowest possible number resulting in a hash with 5 leading zeroes is',
	solver
} satisfies Solution;
