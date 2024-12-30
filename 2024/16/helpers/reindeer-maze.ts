import { Coordinate, Direction, Grid, Neighbor } from '@helpers/grid.js';
import { MinHeap } from '@helpers/min-heap.js';

/* ========================================================================== */

type HeapItem = {
	direction: Direction;
	index: number;
	path?: number[];
	score: number;
	turns: number;
};

/* ========================================================================== */

const neighborMap: Partial<Record<Direction, Direction[]>> = {
	up: ['up', 'right', 'left'],
	right: ['right', 'up', 'down'],
	down: ['down', 'right', 'left'],
	left: ['left', 'up', 'down']
};

const symbol = {
	end: 'E',
	start: 'S',
	wall: '#'
};

/* ========================================================================== */

export class ReindeerMaze extends Grid {
	constructor(protected grid: string[], protected readonly columns: number) {
		super(grid, columns);

		this.endIndex = grid.findIndex(cell => cell === symbol.end);
		this.endCoordinate = this.indexToCoordinate(this.endIndex);
		this.startIndex = grid.findIndex(cell => cell === symbol.start);
		this.startCoordinate = this.indexToCoordinate(this.startIndex);
	}

	/* ---------------------------------------------------------------------- */

	static createInstance(input: string) {
		const lines = input.split('\n');
		const grid = lines.reduce((result, line) => [...result, ...line.split('')], []);

		return new ReindeerMaze(grid, lines[0].length);
	}

	/* ---------------------------------------------------------------------- */

	readonly endCoordinate: Coordinate;
	readonly endIndex: number;
	readonly startCoordinate: Coordinate;
	readonly startIndex: number;

	/* ---------------------------------------------------------------------- */

	private createQueueItem(entry: HeapItem, neighbor: Neighbor): HeapItem {
		return {
			direction: neighbor.direction,
			index: neighbor.index,
			path: entry.path ? [...entry.path, neighbor.index] : undefined,
			score: entry.score + ((entry.direction === neighbor.direction) ? 1 : 1001),
			turns: entry.turns + ((entry.direction === neighbor.direction) ? 0 : 1),
		};
	}

	/* ---------------------------------------------------------------------- */

	public findLowestScore(): number {
		const queuedNodes = new Set<string>();
		const visitedNodes = new Set<string>();
		// Prioritize nodes which have the least number of turns in their path.
		const queue = new MinHeap<HeapItem>(item => item.turns);
		queue.push({
			direction: 'right',
			turns: 0,
			index: this.startIndex,
			score: 1
		});

		while (queue.size > 0) {
			// Get the item at the head of the queue.
			const entry = queue.pop();
			// Mark the node as being part of the solution so it doesn't
			// get reused. The direction is needed because the same node can be
			// part of multiple possible paths.
			visitedNodes.add(entry.index + entry.direction);

			// Get the viable neighbors for the node. Walls and nodes already in
			// the solution are NOT viable neighbors.
			const neighbors = this.neighbors(entry.index, neighborMap[entry.direction])
				.filter(neighbor =>
					neighbor.value !== symbol.wall &&
					!visitedNodes.has(neighbor.index + neighbor.direction)
				);

			for (const neighbor of neighbors) {
				// When we've found the end point, return the total score for
				// the route we've found.
				if (neighbor.index === this.endIndex) return entry.score;

				const neighborId = `${neighbor.index}-${neighbor.direction}`;
				// Calculate the score for the node based on the current
				// path we're on.
				const itemToQueue = this.createQueueItem(entry, neighbor);

				// Check if the node has already been queued, if it is it could
				// be the current path passes through the node but with a lower
				// score for the route. As with the visited nodes, the direction
				// from which we approach the node matters.
				if (queuedNodes.has(neighborId)) {
					// Find the item in the queue.
					const queuedItem = queue.find(
						item => item.index === neighbor.index && item.direction === neighbor.direction
					);

					// If the score in the queue is the same or lower there is
					// no need to take any further action. The current path is
					// not a improvement.
					if (queuedItem.score <= itemToQueue.score) continue;

					// Update the item in the queue with the lower scoring path.
					queue.updateItem(
						item => item.index === neighbor.index && item.direction === neighbor.direction,
						itemToQueue
					);
				} else {
					queuedNodes.add(neighborId);
					queue.push(itemToQueue);
				}
			}
		}

		return Infinity;
	}

	public findNumberOfTiles(): number {
		let lowestScore = Infinity;
		const pathTiles = new Set<number>([this.startIndex, this.endIndex]);
		const visitedNodes = new Map<string, number>();

		// Prioritize nodes which have the least number of turns in their path.
		const queue = new MinHeap<HeapItem>(item => item.turns);
		queue.push({
			direction: 'right',
			turns: 0,
			index: this.startIndex,
			path: [],
			score: 1
		});

		while (queue.size > 0) {
			// Get the item at the head of the queue.
			const entry = queue.pop();

			// When the score for the the entry exceeds the lowest found score,
			// there is no point in continuing with the branch.
			if (entry.score > lowestScore) continue;

			// If this node has already been visited but with a lower score it
			// means the path for this entry is not going to give a better score
			// and doesn't have to be further explored.
			if (
				visitedNodes.get(entry.index + entry.direction) &&
				visitedNodes.get(entry.index + entry.direction) < entry.score
			) {
				continue;
			}
			visitedNodes.set(entry.index + entry.direction, entry.score);

			// Get the viable neighbors for the node. Walls are never a viable
			// neighbor. Nodes in the visited path can be ignored when all paths
			// should be found.
			const neighbors = this.neighbors(entry.index, neighborMap[entry.direction])
				.filter(neighbor => neighbor.value !== symbol.wall);

			for (const neighbor of neighbors) {
				// Check if the end point has been reached.
				if (neighbor.index === this.endIndex) {
					// The first path found has the lowest score, we keep this
					// value so we can prune branches which go over this score.
					lowestScore = entry.score;
					entry.path.forEach(index => pathTiles.add(index));

					continue;
				}

				queue.push(this.createQueueItem(entry, neighbor));
			}
		}

		return pathTiles.size;
	}
}
