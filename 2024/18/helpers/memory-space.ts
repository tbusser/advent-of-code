import { MinHeap } from '@helpers/min-heap.js';
import { Coordinate, Grid, Position } from '@helpers/grid.js';

/* ========================================================================== */

type QueueItem = {
	cost: number;
	index: number;
	distance: number;
};

const symbol = {
	corrupted: '#',
	empty: '.'
};

/* ========================================================================== */

export class MemorySpace extends Grid {
	static createInstance(gridSize: number) {
		const grid = new Array(gridSize * gridSize).fill(symbol.empty);

		return new MemorySpace(grid, gridSize);
	}

	/* ---------------------------------------------------------------------- */

	private endCoordinate: Coordinate = { x: this.columns - 1, y: this.columns - 1 };
	private endIndex = this.coordinateToIndex(this.endCoordinate);

	/* ---------------------------------------------------------------------- */

	private calculateDistance(x: number, y: number): number {
		return (
			Math.abs(this.endCoordinate.x - x) +
			Math.abs(this.endCoordinate.y - y)
		);
	}

	/* ---------------------------------------------------------------------- */

	public findShortestPath(): number {
		const queuedNodes = new Set<number>([0]);
		const visitedNodes = new Set<number>();
		const queue = new MinHeap<QueueItem>(item => item.distance);

		queue.push({
			index: 0,
			cost: 0,
			distance: this.calculateDistance(0, 0)
		});

		while (queue.size > 0) {
			const entry = queue.pop();
			visitedNodes.add(entry.index);

			const neighbors = this.neighbors(entry.index, ['up', 'right', 'down', 'left'])
				.filter(neighbor =>
					neighbor.value !== symbol.corrupted &&
					!visitedNodes.has(neighbor.index) &&
					!queuedNodes.has(neighbor.index)
				);

			for (const neighbor of neighbors) {
				if (neighbor.index === this.endIndex) {
					return entry.cost + 1;
				}

				queuedNodes.add(neighbor.index);
				queue.push({
					index: neighbor.index,
					cost: entry.cost + 1,
					distance: entry.cost + this.calculateDistance(neighbor.x, neighbor.y)
				});
			}
		}

		return Infinity;
	}

	public markMemorySpaceCorrupted(position: Position) {
		this.grid[this.positionToIndex(position)] = symbol.corrupted;
	}
}
