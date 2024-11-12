import { describe, expect, it } from 'vitest';

import { countHouses } from './count-houses.js';

/* ========================================================================== */

describe('2015/03/2', () => {
	describe('two runners', () => {
		const numberOfRunners = 2;

		it('should visit three houses for "^v"', async () => {
			expect(countHouses('^v', numberOfRunners)).toEqual(3);
		});

		it('should visit 3 houses for "^>v<"', async () => {
			expect(countHouses('^>v<', numberOfRunners)).toEqual(3);
		});

		it('should visit 11 houses for "^v^v^v^v^v"', async () => {
			expect(countHouses('^v^v^v^v^v', numberOfRunners)).toEqual(11);
		});
	});
});
