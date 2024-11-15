import { findNumber } from './helpers/find-number.js';

/* ========================================================================== */

export async function solver(input: string): Promise<number> {
	return findNumber(input, 6);
}

export const prompt =
	'The lowest possible number resulting in a hash with 6 leading zeroes is';
