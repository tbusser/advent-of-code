import { describe, expect, it } from 'vitest';
import { MinHeap as Base } from './min-heap.js';

/* ========================================================================== */

/**
 * A subclass of the MinHeap implementation to easily get the array holding the
 * content of the heap. This way it is easier to test the internal working of
 * the min heap class.
 */
class MinHeap<T = number> extends Base<T> {
	public get content(): T[] {
		return [...this.items];
	}
}

/* ========================================================================== */

describe('helpers', () => {
	describe('min heap', () => {
		it('should handle having a single item', () => {
			const heap = new MinHeap(x => x);
			heap.push(10);
			expect(heap.pop()).toEqual(10);
		});

		it('should handle multiple items', () => {
			const heap = new MinHeap(x => x);
			heap.push(10, 15, 20, 17, 8);
			expect(heap.content).toEqual([8, 10, 20, 17, 15]);
		});

		it('should reorganize after extracting the root element', () => {
			const heap = new MinHeap(x => x);
			heap.push(10, 15, 20, 17, 8);
			expect(heap.pop()).toEqual(8);
			expect(heap.content).toEqual([10, 15, 20, 17]);
		});

		it('should handle duplicate values', () => {
			const heap = new MinHeap(x => x);
			heap.push(5, 15, 15, 15);
			expect(heap.content).toEqual([5, 15, 15, 15]);
		});

		it('should be able to rescore an item', () => {
			const heap = new MinHeap(x => x);
			heap.push(10, 15, 20, 17, 30);
			heap.updateItem(i => i === 30, 8);
			expect(heap.content).toEqual([8, 10, 20, 17, 15]);
		});

		it('should keep the items ordered when taking items out', () => {
			const heap = new MinHeap(x => x);
			heap.push(1, 1001, 2, 1002, 3, 1003, 4, 1004, 5, 1005, 6, 1006);
			const items = [];
			while (heap.size > 0) {
				items.push(heap.pop());
			}
			expect(items).toEqual([1, 2, 3, 4, 5, 6, 1001, 1002, 1003, 1004, 1005, 1006]);
		});
	});
});
