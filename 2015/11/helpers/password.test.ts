import { describe, expect, it } from 'vitest';
import {
	convertNumberArrayToPassword,
	convertPasswordToNumberArray,
	findNextPassword,
	generateNextPossiblePassword
} from './password.js';

/* ========================================================================== */

describe('2015/11', () => {
	describe('convertPasswordToNumberArray', () => {
		it('should convert a string to an array of character codes.', () => {
			expect(convertPasswordToNumberArray('abcdef')).toEqual([97, 98, 99, 100, 101, 102]);
		});
	});

	describe('convertNumberArrayToPassword', () => {
		it('should convert an array of char codes to a string', () => {
			expect(convertNumberArrayToPassword([97, 98, 99, 100, 101, 102])).toBe('abcdef');
		});
	});

	describe('generateNextPossiblePassword', () => {
		it('should generate the next password by going to the next letter starting at the end', () => {
			const passwordGenerator = generateNextPossiblePassword([97, 97, 97, 97, 121, 97]);
			const result = passwordGenerator.next();

			expect(result.value).toEqual([97, 97, 97, 97, 121, 98]);
			expect(result.done).toBe(false);
		});

		it('should increase the previous letter by one when the last letter is a z', () => {
			const passwordGenerator = generateNextPossiblePassword([97, 97, 97, 97, 121, 122]);
			const result = passwordGenerator.next();

			expect(result.value).toEqual([97, 97, 97, 97, 122, 97]);
			expect(result.done).toBe(false);
		});

		it('should keep increasing previous letters till it finds a letter which is not a z', () => {
			const passwordGenerator = generateNextPossiblePassword([97, 97, 97, 122, 122, 122]);
			const result = passwordGenerator.next();

			expect(result.value).toEqual([97, 97, 98, 97, 97, 97]);
			expect(result.done).toBe(false);
		});

		it('should stop once all the letters are the letter z', () => {
			const passwordGenerator = generateNextPossiblePassword([122, 122, 122, 122, 122, 122]);
			const result = passwordGenerator.next();

			expect(result.value).toEqual([122, 122, 122, 122, 122, 122]);
			expect(result.done).toBe(true);
		});

		it('should not modify the original array', () => {
			const password = [97, 97, 97, 97, 97, 97];
			const passwordGenerator = generateNextPossiblePassword(password);
			const result = passwordGenerator.next();

			expect(result.value).toEqual([97, 97, 97, 97, 97, 98]);
			expect(password).toEqual([97, 97, 97, 97, 97, 97]);
		});
	});

	describe('findNextPassword', () => {
		it('should return the next valid password for the given input', () => {
			expect(findNextPassword('abcdefgh')).toBe('abcdffaa');
		});

		it('should return null when there is no next valid password', () => {
			expect(findNextPassword('zzzzzy')).toBe(null);
		});
	});
});
