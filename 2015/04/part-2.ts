import { findNumber } from './helpers/find-number.js';

/* ========================================================================== */

function solver(input: string): number {
	return findNumber(input, 6);
}

/* -------------------------------------------------------------------------- */

export default {
	prompt: 'The lowest possible number resulting in a hash with 6 leading zeroes is',
	solver
} satisfies Solution;
