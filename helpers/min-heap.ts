import { BinaryHeap } from './binary-heap.js';

export class MinHeap<T = number> extends BinaryHeap<T> {
	constructor(private calculateScore: (item: T) => number) {
		super((a, b) => this.calculateScore(a) - this.calculateScore(b));
	}

	/* ---------------------------------------------------------------------- */

	public updateItem(predicate: (value: T) => boolean, newValue: T) {
		const index = this.items.findIndex(predicate);
		if (index === -1) return;

		this.items[index] = newValue;

		if (
			this.getParentIndex(index) >= 0 &&
			this.calculateScore(newValue) < this.calculateScore(this.items[this.getParentIndex(index)])
		) {
			this.bubbleUp(index);
		} else {
			this.sinkDown(index);
		}
	}
}
