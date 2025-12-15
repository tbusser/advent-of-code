/**
 * A compare method to determine the order of the items in the heap.
 */
type CompareMethod<T> = (a: T, b: T) => number;

/* ========================================================================== */

/**
 * A binary heap implementation supporting both min and max heaps.
 *
 * @template T The type of items stored in the heap
 *
 * @example
 * // Min heap (smallest first)
 * const minHeap = new BinaryHeap<number>((a, b) => a - b);
 *
 * // Max heap (largest first)
 * const maxHeap = new BinaryHeap<number>((a, b) => b - a);
 *
 * // Priority queue
 * const taskHeap = new BinaryHeap<Task>((a, b) => a.priority - b.priority);
 */
export class BinaryHeap<T = number> {
	/**
	 * Constructor for the heap.
	 * @param compare A compare method to determine the order of the items in
	 *        the heap. It should return a number where:
	 *        - A negative value indicates that a should come before b.
	 *        - A positive value indicates that a should come after b.
	 *        - Zero or NaN indicates that a and b are considered equal.
	 */
	constructor(private compare: CompareMethod<T>) {
		// Intentionally left blank.
	}

	/* ---------------------------------------------------------------------- */

	/**
	 * Creates a new BinaryHeap from an existing array using efficient heapify
	 * algorithm. This is more efficient than creating an empty heap and pushing
	 * items individually.
	 *
	 * @param items - The array items to add to the heap.
	 * @param compare - The method used to compare heap items.
	 * @returns A new instance of BinaryHeap containing all the provided items.
	 *
	 * @example
	 * const numbers = [5, 3, 8, 1, 9, 2];
	 * const minHeap = BinaryHeap.fromArray(numbers, (a, b) => a - b);
	 * console.log(minHeap.pop()); // 1 (smallest)
	 */
	static fromArray<T>(items: T[], compare: CompareMethod<T>): BinaryHeap<T> {
		const heap = new BinaryHeap(compare);

		// Make a copy of items to prevent the original array from having the
		// order of its items changed.
		heap.initializeFromArray([...items]);

		return heap;
	}

	/* ---------------------------------------------------------------------- */

	protected items: T[] = [];

	public get size(): number {
		return this.items.length;
	}

	/* ---------------------------------------------------------------------- */

	private initializeFromArray(items: T[]): void {
		this.items = items;

		// Heapify from bottom up
		for (let index = Math.floor(this.size / 2) - 1; index >= 0; index--) {
			this.sinkDown(index);
		}
	}

	/* ---------------------------------------------------------------------- */


	protected getLeftChildIndex(index: number): number {
		return (index * 2) + 1;
	}

	protected getParentIndex(index: number): number {
		return Math.floor((index - 1) / 2);
	}

	protected getRightChildIndex(index: number): number {
		return (index * 2) + 2;
	}

	/* ---------------------------------------------------------------------- */

	protected bubbleUp(index: number = this.items.length - 1) {
		const item = this.items[index];

		while (index > 0) {
			const parent = this.items[this.getParentIndex(index)];
			if (this.compare(item, parent) >= 0) break;

			this.items[this.getParentIndex(index)] = item;
			this.items[index] = parent;

			index = this.getParentIndex(index);
		}
	}

	protected sinkDown(index: number) {
		const size = this.size;

		while (true) {
			const left = this.getLeftChildIndex(index);
			const right = this.getRightChildIndex(index);
			let smallest = index;

			if (left < size && this.compare(this.items[left], this.items[smallest]) < 0) {
				smallest = left;
			}

			if (right < size && this.compare(this.items[right], this.items[smallest]) < 0) {
				smallest = right;
			}

			if (smallest === index) break;

			[this.items[index], this.items[smallest]] =
				[this.items[smallest], this.items[index]];
			index = smallest;
		}
	}

	/* ---------------------------------------------------------------------- */

	/**
	 * Removes all the items from the heap.
	 */
	public clear(): void {
		this.items = [];
	}

	/**
	 * Searches for an item in the heap using the provided predicate.
	 * Note: This is O(n) operation as heaps are not optimized for searching.
	 *
	 * @param predicate - Function to test each item
	 * @returns The first item that matches the predicate, or undefined if
	 *          none found.
	 */
	find(predicate: (value: T) => boolean): T | undefined {
		return this.items.find(predicate);
	}

	/**
	 * Checks if the heap contains any items.
	 *
	 * @returns true when the heap is empty; otherwise false.
	 */
	isEmpty(): boolean {
		return this.size === 0;
	}

	/**
	 * Returns the first item in the heap without removing it.
	 * @returns The first item in the heap.
	 */
	peek(): T | undefined {
		return this.items[0];
	}

	/**
	 * Removes and returns the root item from the heap (minimum for min-heap,
	 * maximum for max-heap).
	 *
	 * @returns The root item of the heap, or undefined if the heap is empty.
	 */
	pop(): T | undefined {
		const firstItem = this.items[0];
		const lastItem = this.items.pop();

		if (this.items.length > 0 && lastItem !== undefined) {
			this.items[0] = lastItem;
			this.sinkDown(0);
		}

		return firstItem;
	}

	/**
	 * Adds one or more items to the heap.
	 * @param items The item(s) to add.
	 */
	push(...items: T[]) {
		for (const item of items) {
			this.items.push(item);
			this.bubbleUp();
		}
	}

	/**
	 * Returns a new array containing all heap items in sorted order.
	 * The original heap remains unchanged.
	 *
	 * @returns A new sorted array of all items in the heap.
	 */
	toArray(): T[] {
		return this.items.toSorted(this.compare);
	}
}
