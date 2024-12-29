export class MinHeap<T = number> {
	constructor(private calculateScore: (item: T) => number) {
		// Intentionally left blank.
	}

	/* ---------------------------------------------------------------------- */

	protected items: T[] = [];

	public get size(): number {
		return this.items.length;
	}

	/* ---------------------------------------------------------------------- */

	private bubbleUp() {
		let index = this.items.length - 1;
		const item = this.items[index];
		const score = this.calculateScore(item);

		while (index > 0) {
			const parent = this.items[this.getParentIndex(index)];

			if (score >= this.calculateScore(parent)) break;

			this.items[this.getParentIndex(index)] = item;
			this.items[index] = parent;

			index = this.getParentIndex(index);
		}
	}

	private getLeftChildIndex(index: number): number {
		return (index * 2) + 1;
	}

	private getParentIndex(index: number): number {
		return Math.floor((index - 1) / 2);
	}

	private getRightChildIndex(index: number): number {
		return (index * 2) + 2;
	}

	private sinkDown(index: number) {
		const size = this.size;
		const item = this.items[index];
		const score = this.calculateScore(item);

		while (true) {
			let swapIndex: number | null = null;

			if (this.getLeftChildIndex(index) < size) {
				const child = this.items[this.getLeftChildIndex(index)];
				const childScore = this.calculateScore(child);

				if (childScore < score) swapIndex = this.getLeftChildIndex(index);
			}

			if (this.getRightChildIndex(index) < size) {
				const child = this.items[this.getRightChildIndex(index)];
				const childScore = this.calculateScore(child);

				if (childScore < score) swapIndex = this.getRightChildIndex(index);
			}

			if (swapIndex === null) break;

			this.items[index] = this.items[swapIndex];
			this.items[swapIndex] = item;
			index = swapIndex;
		}
	}

	/* ---------------------------------------------------------------------- */

	/**
	 * Removes the root item, the item with the lowest score, from the heap.
	 *
	 * @returns The root item of the heap. When the heap has no items it returns
	 *          undefined instead.
	 */
	public pop(): T | undefined {
		if (this.items.length < 2) return this.items.pop();

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
