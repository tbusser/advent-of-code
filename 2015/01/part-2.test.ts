import { describe, expect, it } from 'vitest';

import { solver } from './part-2.js';

/* ========================================================================== */

describe('2015/01/2', () => {
	it('should return 1 for the input ")"', async () => {
		expect(await solver(')')).toBe(1);
	});

	it('should return 5 for the input "()())"', async () => {
		expect(await solver('()())')).toBe(5);
	});
});
