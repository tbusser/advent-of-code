import { describe, expect, it } from 'vitest';

import { solver } from './part-1.js';

/* ========================================================================== */

describe('2015/01/1', () => {
	it('should return 0 for the input "(())" and "()()"', async () => {
		expect(solver('(())')).toBe(0);
		expect(solver('()()')).toBe(0);
	});
});
