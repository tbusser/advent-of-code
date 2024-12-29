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
			heap.pop();
			expect(heap.content).toEqual([10, 15, 20, 17]);
		});

		it('should handle duplicate values', () => {
			const heap = new MinHeap(x => x);
			heap.push(5, 15, 15, 15);
			expect(heap.content).toEqual([5, 15, 15, 15]);
		});
	});
});
