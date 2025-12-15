import { describe, it, expect, beforeEach } from 'vitest';
import { BinaryHeap } from './BinaryHeap.js'; // Adjust import path as needed

/* ========================================================================== */

describe('Helpers/BinaryHeap', () => {
	describe('constructor', () => {
		it('should create empty heap with min compare function', () => {
			const minHeap = new BinaryHeap<number>((a, b) => a - b);
			expect(minHeap.size).toBe(0);
			expect(minHeap.isEmpty()).toBe(true);
		});

		it('should create empty heap with max compare function', () => {
			const maxHeap = new BinaryHeap<number>((a, b) => b - a);
			expect(maxHeap.size).toBe(0);
			expect(maxHeap.isEmpty()).toBe(true);
		});

		it('should work with custom object compare function', () => {
			interface Task {
				priority: number;
				name: string;
			}

			const taskHeap = new BinaryHeap<Task>((a, b) => a.priority - b.priority);
			expect(taskHeap.size).toBe(0);
			expect(taskHeap.isEmpty()).toBe(true);
		});
	});

	describe('fromArray', () => {
		it('should create heap from empty array', () => {
			const heap = BinaryHeap.fromArray<number>([], (a, b) => a - b);
			expect(heap.size).toBe(0);
			expect(heap.isEmpty()).toBe(true);
		});

		it('should create heap from single item array', () => {
			const heap = BinaryHeap.fromArray([42], (a, b) => a - b);
			expect(heap.size).toBe(1);
			expect(heap.peek()).toBe(42);
			expect(heap.pop()).toBe(42);
		});

		it('should create min heap from array', () => {
			const numbers = [5, 3, 8, 1, 9, 2, 7];
			const minHeap = BinaryHeap.fromArray(numbers, (a, b) => a - b);

			expect(minHeap.size).toBe(7);
			expect(minHeap.peek()).toBe(1); // Should be minimum

			// Pop all items - should come out in sorted order
			const sorted = [];
			while (!minHeap.isEmpty()) {
				sorted.push(minHeap.pop());
			}
			expect(sorted).toEqual([1, 2, 3, 5, 7, 8, 9]);
		});

		it('should create max heap from array', () => {
			const numbers = [5, 3, 8, 1, 9, 2, 7];
			const maxHeap = BinaryHeap.fromArray(numbers, (a, b) => b - a);

			expect(maxHeap.size).toBe(7);
			expect(maxHeap.peek()).toBe(9); // Should be maximum

			// Pop all items - should come out in reverse sorted order
			const sorted = [];
			while (!maxHeap.isEmpty()) {
				sorted.push(maxHeap.pop());
			}
			expect(sorted).toEqual([9, 8, 7, 5, 3, 2, 1]);
		});

		it('should not modify original array', () => {
			const originalArray = [5, 3, 8, 1, 9, 2, 7];
			const originalCopy = [...originalArray];

			const heap = BinaryHeap.fromArray(originalArray, (a, b) => a - b);

			// Original array should be unchanged
			expect(originalArray).toEqual(originalCopy);

			// Modify heap - original should still be unchanged
			heap.pop();
			heap.push(100);
			expect(originalArray).toEqual(originalCopy);
		});

		it('should work with custom objects', () => {
			interface Task {
				priority: number;
				name: string;
			}

			const tasks: Task[] = [
				{ priority: 5, name: 'Medium task' },
				{ priority: 1, name: 'High priority task' },
				{ priority: 9, name: 'Low priority task' },
				{ priority: 3, name: 'Another high task' }
			];

			const taskHeap = BinaryHeap.fromArray(tasks, (a, b) => a.priority - b.priority);

			expect(taskHeap.size).toBe(4);
			expect(taskHeap.peek()?.name).toBe('High priority task');
		});

		it('should handle duplicates', () => {
			const numbers = [5, 3, 5, 3, 5];
			const heap = BinaryHeap.fromArray(numbers, (a, b) => a - b);

			expect(heap.size).toBe(5);
			expect(heap.toArray()).toEqual([3, 3, 5, 5, 5]);
		});

		it('should handle large arrays efficiently', () => {
			const largeArray = Array.from({ length: 1000 }, (_, i) => Math.random() * 1000);
			const heap = BinaryHeap.fromArray(largeArray, (a, b) => a - b);

			expect(heap.size).toBe(1000);

			// First few pops should be in order
			const first = heap.pop()!;
			const second = heap.pop()!;
			const third = heap.pop()!;

			expect(first).toBeLessThanOrEqual(second);
			expect(second).toBeLessThanOrEqual(third);
		});
	});

	describe('size', () => {
		let minHeap: BinaryHeap<number>;

		beforeEach(() => {
			minHeap = new BinaryHeap<number>((a, b) => a - b);
		});

		it('should return 0 for empty heap', () => {
			expect(minHeap.size).toBe(0);
		});

		it('should return correct size after adding items', () => {
			minHeap.push(5);
			expect(minHeap.size).toBe(1);

			minHeap.push(3, 8, 1);
			expect(minHeap.size).toBe(4);
		});

		it('should return correct size after removing items', () => {
			minHeap.push(5, 3, 8, 1);
			minHeap.pop();
			expect(minHeap.size).toBe(3);

			minHeap.pop();
			expect(minHeap.size).toBe(2);
		});

		it('should return correct size after clear', () => {
			minHeap.push(5, 3, 8, 1);
			expect(minHeap.size).toBe(4);

			minHeap.clear();
			expect(minHeap.size).toBe(0);
		});
	});

	describe('isEmpty', () => {
		let minHeap: BinaryHeap<number>;

		beforeEach(() => {
			minHeap = new BinaryHeap<number>((a, b) => a - b);
		});

		it('should return true for new empty heap', () => {
			expect(minHeap.isEmpty()).toBe(true);
		});

		it('should return false after adding items', () => {
			minHeap.push(5);
			expect(minHeap.isEmpty()).toBe(false);
		});

		it('should return true after removing all items', () => {
			minHeap.push(5, 3);
			minHeap.pop();
			minHeap.pop();
			expect(minHeap.isEmpty()).toBe(true);
		});

		it('should return true after clear', () => {
			minHeap.push(5, 3, 8);
			minHeap.clear();
			expect(minHeap.isEmpty()).toBe(true);
		});
	});

	describe('clear', () => {
		let minHeap: BinaryHeap<number>;

		beforeEach(() => {
			minHeap = new BinaryHeap<number>((a, b) => a - b);
		});

		it('should clear empty heap', () => {
			minHeap.clear();
			expect(minHeap.size).toBe(0);
			expect(minHeap.isEmpty()).toBe(true);
			expect(minHeap.peek()).toBeUndefined();
		});

		it('should clear heap with items', () => {
			minHeap.push(5, 3, 8, 1, 9);
			expect(minHeap.size).toBe(5);

			minHeap.clear();

			expect(minHeap.size).toBe(0);
			expect(minHeap.isEmpty()).toBe(true);
			expect(minHeap.peek()).toBeUndefined();
			expect(minHeap.pop()).toBeUndefined();
		});

		it('should allow adding items after clear', () => {
			minHeap.push(5, 3, 8);
			minHeap.clear();

			minHeap.push(10, 2);
			expect(minHeap.size).toBe(2);
			expect(minHeap.peek()).toBe(2);
		});
	});

	describe('peek', () => {
		let minHeap: BinaryHeap<number>;

		beforeEach(() => {
			minHeap = new BinaryHeap<number>((a, b) => a - b);
		});

		it('should return undefined for empty heap', () => {
			expect(minHeap.peek()).toBeUndefined();
		});

		it('should return single item without removing it', () => {
			minHeap.push(42);
			expect(minHeap.peek()).toBe(42);
			expect(minHeap.size).toBe(1); // Should not be removed
			expect(minHeap.peek()).toBe(42); // Should still be there
		});

		it('should return minimum item from min heap', () => {
			minHeap.push(5, 3, 8, 1, 9);
			expect(minHeap.peek()).toBe(1);
			expect(minHeap.size).toBe(5); // Should not change size
		});

		it('should return maximum item from max heap', () => {
			const maxHeap = new BinaryHeap<number>((a, b) => b - a);
			maxHeap.push(5, 3, 8, 1, 9);
			expect(maxHeap.peek()).toBe(9);
		});

		it('should update after pop operations', () => {
			minHeap.push(5, 3, 8, 1, 9, 2);

			expect(minHeap.peek()).toBe(1);
			minHeap.pop();
			expect(minHeap.peek()).toBe(2);
			minHeap.pop();
			expect(minHeap.peek()).toBe(3);
		});

		it('should update after push operations', () => {
			minHeap.push(5, 3, 8);
			expect(minHeap.peek()).toBe(3);

			minHeap.push(1);
			expect(minHeap.peek()).toBe(1);

			minHeap.push(0);
			expect(minHeap.peek()).toBe(0);
		});
	});

	describe('push', () => {
		let minHeap: BinaryHeap<number>;

		beforeEach(() => {
			minHeap = new BinaryHeap<number>((a, b) => a - b);
		});

		it('should add single item to empty heap', () => {
			minHeap.push(5);
			expect(minHeap.size).toBe(1);
			expect(minHeap.peek()).toBe(5);
		});

		it('should add multiple items at once', () => {
			minHeap.push(5, 3, 8, 1);
			expect(minHeap.size).toBe(4);
		});

		it('should maintain min heap property', () => {
			minHeap.push(5, 3, 8, 1, 9, 2, 7);

			const sorted = [];
			while (!minHeap.isEmpty()) {
				sorted.push(minHeap.pop());
			}

			expect(sorted).toEqual([1, 2, 3, 5, 7, 8, 9]);
		});

		it('should handle duplicate values', () => {
			minHeap.push(5, 3, 5, 3, 5);

			const result = [];
			while (!minHeap.isEmpty()) {
				result.push(minHeap.pop());
			}

			expect(result).toEqual([3, 3, 5, 5, 5]);
		});

		it('should update peek correctly', () => {
			minHeap.push(5);
			expect(minHeap.peek()).toBe(5);

			minHeap.push(3);
			expect(minHeap.peek()).toBe(3);

			minHeap.push(8);
			expect(minHeap.peek()).toBe(3);

			minHeap.push(1);
			expect(minHeap.peek()).toBe(1);
		});
	});

	describe('pop', () => {
		let minHeap: BinaryHeap<number>;

		beforeEach(() => {
			minHeap = new BinaryHeap<number>((a, b) => a - b);
		});

		it('should return undefined for empty heap', () => {
			expect(minHeap.pop()).toBeUndefined();
		});

		it('should return single item from heap with one element', () => {
			minHeap.push(42);
			expect(minHeap.pop()).toBe(42);
			expect(minHeap.size).toBe(0);
			expect(minHeap.isEmpty()).toBe(true);
		});

		it('should always return minimum item from min heap', () => {
			minHeap.push(5, 3, 8, 1, 9, 2, 7);

			expect(minHeap.pop()).toBe(1);
			expect(minHeap.pop()).toBe(2);
			expect(minHeap.pop()).toBe(3);
		});

		it('should maintain heap property after multiple pops', () => {
			const values = [10, 5, 15, 2, 8, 12, 20, 1, 3];
			minHeap.push(...values);

			minHeap.pop(); // 1
			minHeap.pop(); // 2
			minHeap.pop(); // 3

			minHeap.push(4);
			expect(minHeap.pop()).toBe(4);
		});

		it('should work until heap is empty', () => {
			minHeap.push(5, 3, 8);

			expect(minHeap.pop()).toBe(3);
			expect(minHeap.isEmpty()).toBe(false);

			expect(minHeap.pop()).toBe(5);
			expect(minHeap.isEmpty()).toBe(false);

			expect(minHeap.pop()).toBe(8);
			expect(minHeap.isEmpty()).toBe(true);

			expect(minHeap.pop()).toBeUndefined();
		});

		it('should update peek correctly after pops', () => {
			minHeap.push(5, 3, 8, 1, 9);

			expect(minHeap.peek()).toBe(1);
			minHeap.pop();
			expect(minHeap.peek()).toBe(3);
			minHeap.pop();
			expect(minHeap.peek()).toBe(5);
		});
	});

	describe('find', () => {
		let minHeap: BinaryHeap<number>;

		beforeEach(() => {
			minHeap = new BinaryHeap<number>((a, b) => a - b);
			minHeap.push(5, 3, 8, 1, 9, 2, 7);
		});

		it('should find existing item', () => {
			expect(minHeap.find(x => x === 5)).toBe(5);
			expect(minHeap.find(x => x === 1)).toBe(1);
		});

		it('should return undefined for non-existing item', () => {
			expect(minHeap.find(x => x === 100)).toBeUndefined();
		});

		it('should work with complex predicates', () => {
			const found = minHeap.find(x => x > 5 && x < 10);
			expect([7, 8, 9]).toContain(found);
		});

		it('should find first matching item', () => {
			minHeap.clear();
			minHeap.push(2, 4, 6, 8);
			expect(minHeap.find(x => x % 2 === 0)).toBeDefined();
		});

		it('should work with empty heap', () => {
			minHeap.clear();
			expect(minHeap.find(x => x === 1)).toBeUndefined();
		});

		it('should not modify heap', () => {
			const originalSize = minHeap.size;
			const originalPeek = minHeap.peek();

			minHeap.find(x => x === 5);

			expect(minHeap.size).toBe(originalSize);
			expect(minHeap.peek()).toBe(originalPeek);
		});
	});

	describe('toArray', () => {
		let minHeap: BinaryHeap<number>;

		beforeEach(() => {
			minHeap = new BinaryHeap<number>((a, b) => a - b);
		});

		it('should return empty array for empty heap', () => {
			expect(minHeap.toArray()).toEqual([]);
		});

		it('should return sorted array', () => {
			minHeap.push(5, 3, 8, 1, 9, 2, 7);
			expect(minHeap.toArray()).toEqual([1, 2, 3, 5, 7, 8, 9]);
		});

		it('should not modify original heap', () => {
			minHeap.push(5, 3, 8);
			const originalSize = minHeap.size;
			const originalPeek = minHeap.peek();

			minHeap.toArray();

			expect(minHeap.size).toBe(originalSize);
			expect(minHeap.peek()).toBe(originalPeek);
			expect(minHeap.pop()).toBe(3); // Should still work normally
		});

		it('should handle duplicates', () => {
			minHeap.push(5, 3, 5, 3);
			expect(minHeap.toArray()).toEqual([3, 3, 5, 5]);
		});

		it('should work with max heap', () => {
			const maxHeap = new BinaryHeap<number>((a, b) => b - a);
			maxHeap.push(5, 3, 8, 1, 9);
			expect(maxHeap.toArray()).toEqual([9, 8, 5, 3, 1]); // Descending order
		});
	});

	describe('integration tests', () => {
		it('should work with mixed operations', () => {
			const heap = new BinaryHeap<number>((a, b) => a - b);

			// Start with fromArray
			heap.push(...BinaryHeap.fromArray([5, 3, 8], (a, b) => a - b).toArray());
			expect(heap.peek()).toBe(3);

			// Add more items
			heap.push(1, 9);
			expect(heap.peek()).toBe(1);

			// Pop some items
			expect(heap.pop()).toBe(1);
			expect(heap.pop()).toBe(3);

			// Check what's left
			expect(heap.toArray()).toEqual([5, 8, 9]);

			// Clear and verify
			heap.clear();
			expect(heap.isEmpty()).toBe(true);
			expect(heap.toArray()).toEqual([]);
		});

		it('should maintain consistency across all operations', () => {
			const heap = BinaryHeap.fromArray([10, 5, 15, 2, 8], (a, b) => a - b);

			// Test all query operations return consistent results
			expect(heap.size).toBe(5);
			expect(heap.isEmpty()).toBe(false);
			expect(heap.peek()).toBe(2);
			expect(heap.find(x => x === 2)).toBe(2);

			// Modify heap and test consistency
			heap.push(1);
			expect(heap.peek()).toBe(1);
			expect(heap.size).toBe(6);

			expect(heap.pop()).toBe(1);
			expect(heap.peek()).toBe(2);
			expect(heap.size).toBe(5);
		});
	});

	describe('custom object heap', () => {
		interface Task {
			priority: number;
			name: string;
		}

		let taskHeap: BinaryHeap<Task>;

		beforeEach(() => {
			taskHeap = new BinaryHeap<Task>((a, b) => a.priority - b.priority);
		});

		it('should work with all operations on custom objects', () => {
			const tasks: Task[] = [
				{ priority: 5, name: 'Medium task' },
				{ priority: 1, name: 'High priority task' },
				{ priority: 9, name: 'Low priority task' },
				{ priority: 3, name: 'Another high task' }
			];

			// Test fromArray
			const heapFromArray = BinaryHeap.fromArray(tasks, (a, b) => a.priority - b.priority);
			expect(heapFromArray.peek()?.name).toBe('High priority task');

			// Test push operations
			taskHeap.push(...tasks);
			expect(taskHeap.size).toBe(4);
			expect(taskHeap.peek()?.name).toBe('High priority task');

			// Test find
			expect(taskHeap.find(t => t.name === 'Medium task')?.priority).toBe(5);

			// Test pop order
			expect(taskHeap.pop()?.name).toBe('High priority task');
			expect(taskHeap.pop()?.name).toBe('Another high task');
			expect(taskHeap.pop()?.name).toBe('Medium task');
			expect(taskHeap.pop()?.name).toBe('Low priority task');

			expect(taskHeap.isEmpty()).toBe(true);
		});
	});
});
