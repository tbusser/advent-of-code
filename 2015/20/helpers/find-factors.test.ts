import { describe, expect, it } from 'vitest';

import { findFactors } from './find-factors.js';

/* ========================================================================== */

describe('Calculate factors', () => {
	it('should return the factors for any given number', () => {
		expect(findFactors(25)).toEqual([1, 5, 25]);
		expect(findFactors(45)).toEqual([1, 3, 5, 9, 15, 45]);
		expect(findFactors(53)).toEqual([1, 53]);
		expect(findFactors(64)).toEqual([1, 2, 4, 8, 16, 32, 64]);
		expect(findFactors(100)).toEqual([1, 2, 4, 5, 10, 20, 25, 50, 100]);
		expect(findFactors(102)).toEqual([1, 2, 3, 6, 17, 34, 51, 102]);
		expect(findFactors(120)).toEqual([1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 24, 30, 40, 60, 120]);
		expect(findFactors(12345)).toEqual([1, 3, 5, 15, 823, 2469, 4115, 12345]);
		expect(findFactors(32766)).toEqual([
			1, 2, 3, 6, 43, 86, 127, 129, 254, 258, 381, 762, 5461, 10922, 16383, 32766
		]);
		expect(findFactors(32767)).toEqual([1, 7, 31, 151, 217, 1057, 4681, 32767]);
	});
});
