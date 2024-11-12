import { describe, expect, it } from 'vitest';

import { isWordNice, testDoubleLetter, testNoForbiddenCombos, testVowelCondition } from './part-1.js';

/* ========================================================================== */

describe('2015/05/1', () => {
	it('testVowelCondition should return true when a word has at least 3 vowels', () => {
		expect(testVowelCondition('abc')).toEqual(false);
		expect(testVowelCondition('aaa')).toEqual(true);
		expect(testVowelCondition('ugknbfddgicrmopn')).toEqual(true);
	});

	it(
		'testDoubleLetter should return true when a word has at once the same letter twice in sequence',
		() => {
			expect(testDoubleLetter('abc')).toEqual(false);
			expect(testDoubleLetter('aa')).toEqual(true);
			expect(testDoubleLetter('ugknbfddgicrmopn')).toEqual(true);
		}
	);

	it('testNoForbiddenCombos', () => {
		expect(testNoForbiddenCombos('abc')).toEqual(false);
		expect(testNoForbiddenCombos('bcd')).toEqual(false);
		expect(testNoForbiddenCombos('ugknbfddgicrmopn')).toEqual(true);
	});

	it('isWordNice', () => {
		expect(isWordNice('bztjhxpjthchhfcd')).toEqual(false);
	});
});
