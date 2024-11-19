import { describe, expect, it } from 'vitest';

import { testRepeatingGroup, testRepeatingLetter } from './part-2.js';

/* ========================================================================== */

describe('2015/05/2', () => {
	describe('testRepeatingGroup', () => {
		it('should return true when the input contains a group of letters twice, without any overlap', () => {
			// Contains the group "gj"
			expect(testRepeatingGroup('qjhvhtzxzqqjkmpb')).toBe(true);
			// Contains the group "xx"
			expect(testRepeatingGroup('xxyxx')).toBe(true);
			// Contains the group "tg"
			expect(testRepeatingGroup('uurcxstgmygtbstg')).toBe(true);
			// Contains the group "xy"
			expect(testRepeatingGroup('xyxy')).toBe(true);
			// Contains the group "aa"
			expect(testRepeatingGroup('aabcdefgaa')).toBe(true);
		});

		it('should return false when the input contains a group of letters twice but the groups overlap', () => {
			expect(testRepeatingGroup('aaa')).toBe(false);
			expect(testRepeatingGroup('abcaaadef')).toBe(false);
		});

		it('should return false when the input contains a no group of letters twice', () => {
			expect(testRepeatingGroup('abcdefghij')).toBe(false);
		});
	});

	describe('testRepeatingLetter', () => {
		it('should return true when a letter occurs two position further', () => {
			expect(testRepeatingLetter('xyx')).toBe(true);
			expect(testRepeatingLetter('abcdefeghi')).toBe(true);
			expect(testRepeatingLetter('aaa')).toBe(true);
			expect(testRepeatingLetter('qjhvhtzxzqqjkmpb')).toBe(true);
			expect(testRepeatingLetter('xxyxx')).toBe(true);
			expect(testRepeatingLetter('ieodomkazucvgmuy')).toBe(true);
		});

		it('should return false when there is no letter occurring two position further', () => {
			expect(testRepeatingLetter('uurcxstgmygtbstg')).toBe(false);
			expect(testRepeatingLetter('abcdefghij')).toBe(false);
		});
	});
});
