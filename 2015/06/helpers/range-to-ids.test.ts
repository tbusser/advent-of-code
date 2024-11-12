import { describe, expect, it } from 'vitest';
import { convertRangeToId } from './range-to-ids.js';

/* ========================================================================== */

describe('convertRangeToId', () => {
	it('should convert a range to the matching ids', () => {
		expect(
			convertRangeToId({ start: { x: 0, y: 0 }, end: { x: 3, y: 3 } }, 4))
			.toEqual([
				0, 1, 2, 3,
				4, 5, 6, 7,
				8, 9, 10, 11,
				12, 13, 14, 15
			]);

		expect(
			convertRangeToId({ start: { x: 1, y: 1 }, end: { x: 2, y: 2 } }, 4))
			.toEqual([5, 6, 9, 10,]);
	});
});
