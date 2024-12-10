import { Direction, Grid as BaseGrid } from '@helpers/grid.js';

/* ========================================================================== */

type TrailCompletionCallback = (start: number, end: number) => void;

type QueueItem = {
	index: number,
	path: number[],
	start: number,
	value: number
};

/* ========================================================================== */

const walkingDirections: Direction[] = ['up', 'right', 'down', 'left'];

/* ========================================================================== */

export class TopographicMap extends BaseGrid<number> {
	constructor(protected grid: number[], protected readonly columns: number) {
		super(grid, columns);
	}

	/* ---------------------------------------------------------------------- */

	static createInstance(input: string) {
		const lines = input.split('\n');
		const numericLines = lines.reduce((grid, line) => ([...grid, ...line.split('').map(Number)]), []);

		return new TopographicMap(numericLines, lines[0].length);
	}

	/* ---------------------------------------------------------------------- */

	public findTrails(callback: TrailCompletionCallback) {
		const queue: QueueItem[] = [];

		// Find all cells with a 0 and add a queue item for each of these cells,
		// these are our starting points.
		for (let index = 0; index < this.grid.length; index++) {
			if (this.grid[index] === 0) {
				queue.push({
					index,
					path: [index],
					start: index,
					value: 0
				});
			}
		}

		while (queue.length > 0) {
			const entry = queue.pop();
			const neighbors = this.neighbors(entry.index, walkingDirections);

			for (const neighbor of neighbors) {
				if (neighbor.value !== entry.value + 1) continue;

				if (neighbor.value === 9) {
					callback(entry.start, neighbor.index);
					continue;
				}

				if (entry.path.includes(neighbor.index)) continue;

				queue.push({
					index: neighbor.index,
					path: [...entry.path, neighbor.index],
					start: entry.start,
					value: neighbor.value
				});
			}
		}
	}
}
