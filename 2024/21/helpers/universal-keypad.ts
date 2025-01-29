import { Direction, Grid } from '@helpers/grid.js';
import { MinHeap } from '@helpers/min-heap.js';

/* ========================================================================== */

type BestPath = {
	length: number;
};

type Layout = 'directional' | 'numeric';

type Move = '^' | '>' | 'v' | '<' | 'A';

type QueueItem = {
	index: number;
	moves: Move[];
	path: number[];
	score: number;
};

/* ========================================================================== */

const directions: Direction[] = ['up', 'right', 'down', 'left'];

const distances: Record<Move, Record<Move, number>> = {
	'<': { '<': 0, '>': 2, 'A': 3, '^': 2, 'v': 1 },
	'>': { '<': 2, '>': 0, 'A': 1, '^': 2, 'v': 1 },
	'A': { '<': 3, '>': 1, 'A': 0, '^': 1, 'v': 2 },
	'^': { '<': 2, '>': 2, 'A': 1, '^': 0, 'v': 1 },
	'v': { '<': 1, '>': 1, 'A': 2, '^': 1, 'v': 0 }
};

const moveMapping: Record<Extract<Direction, 'up' | 'right' | 'down' | 'left'>, Move> = {
	down: 'v',
	left: '<',
	right: '>',
	up: '^'
};

const layoutKeys: Record<Layout, string[]> = {
	directional: ['.', '^', 'A', '<', 'v', '>'],
	numeric: ['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0', 'A']
};

/* ========================================================================== */

export class UniversalKeypad extends Grid {
	constructor() {
		super(layoutKeys.numeric, 3);
	}

	/* ---------------------------------------------------------------------- */

	private cache = new Map<number, number>();

	/* ---------------------------------------------------------------------- */

	private createCacheKey(start: number, end: number, currentLevel: number): number {
		return (start * 676) + (end * 26) + currentLevel;
	}

	private getDistance(previousDirection: Move | undefined, direction: Move): number {
		return distances[previousDirection ?? 'A'][direction];
	}

	/* ---------------------------------------------------------------------- */

	public findShortestPath(start: string, end: string, currentLevel: number, levels: number): number {
		// When the start key and end key are the same the robot only has to
		// press the A key.
		if (start === end) return 1;

		const startIndex: number = this.grid.findIndex(cell => cell === start);
		const endIndex: number = this.grid.findIndex(cell => cell === end);

		// First check if we already determined a shortest path for the provided
		// start and end position. If possible, return the result from
		// the cache.
		const cacheKey = this.createCacheKey(startIndex, endIndex, currentLevel);
		if (this.cache.has(cacheKey)) return this.cache.get(cacheKey);

		const bestPath: BestPath = { length: Infinity };

		const queue = new MinHeap<QueueItem>(item => item.score);
		queue.push({ index: startIndex, moves: [], path: [startIndex], score: 0 });

		while (queue.size > 0) {
			const entry = queue.pop();

			if (entry.moves.length > bestPath.length) continue;

			if (entry.index === endIndex) {
				entry.moves.push('A');
				const result = (currentLevel === (levels - 1))
					? entry.moves.length
					: this.generateInstructions(entry.moves.join(''), levels, currentLevel + 1);

				if (result < bestPath.length) {
					bestPath.length = result;
				}
				continue;
			}

			// Get all the neighbors of the entry but filter out empty spaces
			// and neighbors already in the path of the entry.
			const neighbors = this.neighbors(entry.index, directions)
				.filter(neighbor => neighbor.value !== '.' && !entry.path.includes(neighbor.index));

			// Iterate over all the neighbors which can still be visited.
			for (const neighbor of neighbors) {
				// Add a new queue entry with the neighbor as the most recently
				// visited cell.
				queue.push({
					index: neighbor.index,
					moves: [...entry.moves, moveMapping[neighbor.direction]],
					path: [...entry.path, neighbor.index],
					score: entry.score + this.getDistance(entry.moves.at(-1), moveMapping[neighbor.direction])
				});
			}
		}

		this.cache.set(cacheKey, bestPath.length);

		return bestPath.length;
	}

	public generateInstructions(sequence: string, levels: number, currentLevel: number = 0): number {
		const previousLayout = this.grid;
		// On level 0 use the numeric layout, for the deeper levels use the
		// directional layout.
		this.grid = currentLevel === 0 ? layoutKeys.numeric : layoutKeys.directional;
		// All sequences start from the A position.
		const parts = `A${sequence}`.split('');
		let totalLength: number = 0;

		for (let index = 0; index < parts.length - 1; index++) {
			totalLength += this.findShortestPath(parts[index], parts[index + 1], currentLevel, levels);
		}

		this.grid = previousLayout;

		return totalLength;
	}
}
