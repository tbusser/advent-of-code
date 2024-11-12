import { describe, expect, it } from 'vitest';

import { readOut } from './read-out.js';

/* ========================================================================== */

describe('read-out', () => {
	it('should return the proper output', () => {
		expect(readOut('1')).toBe('11');
		expect(readOut('11')).toBe('21');
		expect(readOut('21')).toBe('1211');
		expect(readOut('1211')).toBe('111221');
		expect(readOut('111221')).toBe('312211');
	});
});
