import { describe, expect, it } from 'vitest';

import {
	charCodeA,
	charCodeI,
	charCodeL,
	charCodeO,
	charCodeZ
} from './shared.js';

import {
	meetsDoubleLetterRequirement,
	meetsInvalidCharacterRestriction,
	meetsSequentialCharactersRequirement
} from './validation.js';

/* ========================================================================== */

describe('2015/11', () => {
	describe('validation', () => {
		it('should properly evaluate the double letters rule', () => {
			expect(meetsDoubleLetterRequirement([1, 2, 1, 1, 1])).toBe(false);
			expect(meetsDoubleLetterRequirement([1, 1, 2, 1, 3, 3])).toBe(true);
		});

		it('should properly evaluate the invalid characters rule', () => {
			expect(meetsInvalidCharacterRestriction([charCodeA, charCodeZ, charCodeI])).toBe(false);
			expect(meetsInvalidCharacterRestriction([charCodeA, charCodeO, charCodeZ])).toBe(false);
			expect(meetsInvalidCharacterRestriction([charCodeL, charCodeA, charCodeZ])).toBe(false);
			expect(meetsInvalidCharacterRestriction([charCodeA, charCodeZ])).toBe(true);
		});

		it('should properly evaluate the character sequence rule', () => {
			expect(meetsSequentialCharactersRequirement([1, 2, 4])).toBe(false);
			expect(meetsSequentialCharactersRequirement([1, 2, 4, 5, 7])).toBe(false);
			expect(meetsSequentialCharactersRequirement([3, 2, 1])).toBe(false);
			expect(meetsSequentialCharactersRequirement([1, 2, 3])).toBe(true);
			expect(meetsSequentialCharactersRequirement([0, 2, 3, 4, 9])).toBe(true);
			expect(meetsSequentialCharactersRequirement([1, 2, 4, 5, 6])).toBe(true);
			expect(meetsSequentialCharactersRequirement([1, 2, 3, 6, 6])).toBe(true);
		});
	});
});
