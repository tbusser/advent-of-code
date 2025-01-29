/**
 * A compare method to determine the order of the items in the heap.
 */
type CompareMethod<T> = (a: T, b: T) => number;

/* ========================================================================== */

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

	protected items: T[] = [];

	public get size(): number {
		return this.items.length;
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
		const item = this.items[index];

		while (true) {
			let swapIndex: number | null = null;

			if (this.getLeftChildIndex(index) < size) {
				const child = this.items[this.getLeftChildIndex(index)];
				if (this.compare(child, item) < 0) {
					swapIndex = this.getLeftChildIndex(index);
				}
			}

			if (
				this.getRightChildIndex(index) < size &&
				(
					swapIndex === null ||
					this.compare(this.items[this.getRightChildIndex(index)], this.items[swapIndex]) < 0
				)
			) {
				const child = this.items[this.getRightChildIndex(index)];
				if (this.compare(child, item) < 0) {
					swapIndex = this.getRightChildIndex(index);
				}
			}

			if (swapIndex === null) break;

			this.items[index] = this.items[swapIndex];
			this.items[swapIndex] = item;
			index = swapIndex;
		}
	}

	/* ---------------------------------------------------------------------- */

	public find(predicate: (value: T) => boolean): T | undefined {
		return this.items.find(predicate);
	}

	/**
	 * Removes the root item, the item with the lowest score, from the heap.
	 *
	 * @returns The root item of the heap. When the heap has no items it returns
	 *          undefined instead.
	 */
	public pop(): T | undefined {
		const firstItem = this.items[0];
		const lastItem = this.items.pop();

		if (this.items.length > 0) {
			this.items[0] = lastItem;
			this.sinkDown(0);
		}

		return firstItem;
	}

	/**
	 * Adds one or more items to the heap.
	 * @param items The item(s) to add.
	 */
	public push(...items: T[]) {
		items.forEach(item => {
			this.items.push(item);
			this.bubbleUp();
		});
	}
}
