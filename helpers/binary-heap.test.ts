import { describe, expect, it } from 'vitest';
import { BinaryHeap } from './binary-heap.js';

/* ========================================================================== */

describe('Helpers', () => {
	describe('Binary heap', () => {
		describe('Basic functionality', () => {
			// This will make it min heap.
			const heap = new BinaryHeap((a, b) => a - b);

			it('should correctly report the number if items in the heap', () => {
				heap.push(1, 1001, 2, 1002, 3, 1003, 4, 1004, 5, 1005);
				expect(heap.size).toBe(10);
			});

			it('should return the first item when calling pop()', () => {
				expect(heap.pop()).toBe(1);
			});

			it('should update the size after popping an item', () => {
				expect(heap.size).toBe(9);
			});

			it('should pop the items in the order dictated by the compare method', () => {
				const items: number[] = [];
				while (heap.size > 0) {
					items.push(heap.pop());
				}

				expect(items).toEqual([2, 3, 4, 5, 1001, 1002, 1003, 1004, 1005]);
			});

			it('should return undefined when pop() is called and the heap is empty', () => {
				expect(heap.pop()).toBe(undefined);
			});

			it('should properly return the size when it is empty', () => {
				expect(heap.size).toBe(0);
			});
		});

		describe('alternative sorting', () => {
			// This will make it max heap.
			const heap = new BinaryHeap((a, b) => b - a);

			it('should correctly report the number if items in the heap', () => {
				heap.push(1, 1001, 2, 1002, 3, 1003, 4, 1004, 5, 1005);
				expect(heap.size).toBe(10);
			});

			it('should return the first item when calling pop()', () => {
				expect(heap.pop()).toBe(1005);
			});

			it('should pop the items in the order dictated by the compare method', () => {
				const items: number[] = [];
				while (heap.size > 0) {
					items.push(heap.pop());
				}

				expect(items).toEqual([1004, 1003, 1002, 1001, 5, 4, 3, 2, 1]);
			});
		});
	});
});
