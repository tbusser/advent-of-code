import { describe, it, expect } from 'vitest';

import { Range } from './Range.js';

/* ========================================================================== */

describe('@helpers/Range', () => {
	describe('constructor', () => {
		it('should create a valid range', () => {
			const range = new Range(1, 5);
			expect(range.start).toBe(1);
			expect(range.end).toBe(5);
		});

		it('should create a single-number range', () => {
			const range = new Range(3, 3);
			expect(range.start).toBe(3);
			expect(range.end).toBe(3);
		});

		it('should handle negative numbers', () => {
			const range = new Range(-5, -1);
			expect(range.start).toBe(-5);
			expect(range.end).toBe(-1);
		});

		it('should handle ranges crossing zero', () => {
			const range = new Range(-3, 3);
			expect(range.start).toBe(-3);
			expect(range.end).toBe(3);
		});
	});

	describe('fromString', () => {
		it('should parse simple dash-separated ranges', () => {
			const range = Range.fromString('1-5');
			expect(range.start).toBe(1);
			expect(range.end).toBe(5);
		});

		it('should parse ranges with various separators', () => {
			expect(Range.fromString('1 to 5')).toEqual(new Range(1, 5));
			expect(Range.fromString('1..5')).toEqual(new Range(1, 5));
			expect(Range.fromString('1,5')).toEqual(new Range(1, 5));
		});

		it('should handle negative numbers', () => {
			const range = Range.fromString('-10--5');
			expect(range.start).toBe(-10);
			expect(range.end).toBe(-5);
		});

		it('should handle whitespace', () => {
			const range = Range.fromString('  1 - 5  ');
			expect(range.start).toBe(1);
			expect(range.end).toBe(5);
		});

		it('should throw error for invalid format', () => {
			expect(() => Range.fromString('invalid')).toThrow('Unable to create range');
			expect(() => Range.fromString('1')).toThrow('Unable to create range');
			expect(() => Range.fromString('')).toThrow('Unable to create range');
		});

		it('should throw error when start > end', () => {
			expect(() => Range
				.fromString('5-1'))
				.toThrow('Invalid range, start (5) should be less than or equal to end (1)'
				);
		});
	});

	describe('size', () => {
		it('should return correct size for positive ranges', () => {
			expect(new Range(1, 5).size).toBe(5);
			expect(new Range(10, 15).size).toBe(6);
		});

		it('should return 1 for single-number ranges', () => {
			expect(new Range(5, 5).size).toBe(1);
		});

		it('should handle negative ranges', () => {
			expect(new Range(-5, -1).size).toBe(5);
		});

		it('should handle ranges crossing zero', () => {
			expect(new Range(-2, 2).size).toBe(5); // -2, -1, 0, 1, 2
		});
	});

	describe('contains', () => {
		const range = new Range(5, 10);

		it('should return true for values within range', () => {
			expect(range.contains(5)).toBe(true);
			expect(range.contains(7)).toBe(true);
			expect(range.contains(10)).toBe(true);
		});

		it('should return false for values outside range', () => {
			expect(range.contains(4)).toBe(false);
			expect(range.contains(11)).toBe(false);
		});

		it('should handle edge cases', () => {
			const singleRange = new Range(5, 5);
			expect(singleRange.contains(5)).toBe(true);
			expect(singleRange.contains(4)).toBe(false);
			expect(singleRange.contains(6)).toBe(false);
		});

		it('should handle negative ranges', () => {
			const negRange = new Range(-10, -5);
			expect(negRange.contains(-7)).toBe(true);
			expect(negRange.contains(-10)).toBe(true);
			expect(negRange.contains(-5)).toBe(true);
			expect(negRange.contains(-4)).toBe(false);
			expect(negRange.contains(-11)).toBe(false);
		});
	});

	describe('mergeOverlapping', () => {
		it('should return empty array for empty input', () => {
			expect(Range.mergeOverlapping([])).toEqual([]);
		});

		it('should return single range unchanged', () => {
			const ranges = [new Range(1, 5)];
			expect(Range.mergeOverlapping(ranges)).toEqual(ranges);
		});

		it('should merge overlapping ranges', () => {
			const ranges = [
				new Range(1, 5),
				new Range(3, 8),
				new Range(10, 15)
			];
			const result = Range.mergeOverlapping(ranges);
			expect(result).toEqual([
				new Range(1, 8),
				new Range(10, 15)
			]);
		});

		it('should merge adjacent ranges', () => {
			const ranges = [
				new Range(1, 5),
				new Range(6, 10)
			];
			const result = Range.mergeOverlapping(ranges);
			expect(result).toEqual([new Range(1, 10)]);
		});

		it('should handle contained ranges', () => {
			const ranges = [
				new Range(1, 10),
				new Range(3, 7),
				new Range(15, 20)
			];
			const result = Range.mergeOverlapping(ranges);
			expect(result).toEqual([
				new Range(1, 10),
				new Range(15, 20)
			]);
		});

		it('should handle unsorted input', () => {
			const ranges = [
				new Range(10, 15),
				new Range(1, 5),
				new Range(3, 12)
			];
			const result = Range.mergeOverlapping(ranges);
			expect(result).toEqual([new Range(1, 15)]);
		});

		it('should handle multiple overlapping ranges', () => {
			const ranges = [
				new Range(1, 3),
				new Range(2, 6),
				new Range(8, 10),
				new Range(9, 12),
				new Range(15, 18)
			];
			const result = Range.mergeOverlapping(ranges);
			expect(result).toEqual([
				new Range(1, 6),
				new Range(8, 12),
				new Range(15, 18)
			]);
		});

		it('should not merge ranges that are one apart', () => {
			const ranges = [
				new Range(1, 5),
				new Range(7, 10) // Gap of 1 (6), should not merge
			];
			const result = Range.mergeOverlapping(ranges);
			expect(result).toEqual([
				new Range(1, 5),
				new Range(7, 10)
			]);
		});

		it('should not merge ranges that are two apart', () => {
			const ranges = [
				new Range(1, 5),
				new Range(8, 10) // Gap of 2 (6, 7), should not merge
			];
			const result = Range.mergeOverlapping(ranges);
			expect(result).toEqual([
				new Range(1, 5),
				new Range(8, 10)
			]);
		});

		it('should handle identical ranges', () => {
			const ranges = [
				new Range(1, 5),
				new Range(1, 5),
				new Range(1, 5)
			];
			const result = Range.mergeOverlapping(ranges);
			expect(result).toEqual([new Range(1, 5)]);
		});

		it('should handle negative ranges', () => {
			const ranges = [
				new Range(-10, -5),
				new Range(-7, -3),
				new Range(1, 5)
			];
			const result = Range.mergeOverlapping(ranges);
			expect(result).toEqual([
				new Range(-10, -3),
				new Range(1, 5)
			]);
		});
	});
});
