import { describe, expect, it } from 'vitest';

import { findNumber } from './find-number.js';

/* ========================================================================== */

describe('2015/04/1', () => {
	it('should return 609043 for the input "abcdef"', () => {
		expect(findNumber('abcdef', 5)).toEqual(609043);
	});
});
