import { describe, expect, it } from 'vitest';
import { decryptName } from './decrypt.js';

describe('2016/4', () => {
	describe('decrypt', () => {
		it('should decrypt the given text', () => {
			expect(decryptName('a', 2)).toBe('c');
			expect(decryptName('qzmt-zixmtkozy-ivhz', 343)).toBe('very encrypted name');
		});
	});
});
