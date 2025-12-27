import { LazyMap } from '@helpers/LazyMap.js';

/* ========================================================================== */

export type Input = {
	/**
	 * Which nodes can be visited from a given node.
	 */
	adjacencyList: LazyMap<number, number[]>;

	/**
	 * A sorted list of nodes to serve as starting points.
	 */
	queue: number[];

	/**
	 * A count per node of how many in paths are still unresolved. Only when
	 * the count is 0 should the node be visited.
	 */
	unresolvedInPaths: LazyMap<number, number>;
};

/* ========================================================================== */

export function parseInput(input: string): Input {
	const lines = input.trim().split('\n');

	const adjacencyList = new LazyMap<number, number[]>(() => ([]));
	const unresolvedInPaths = new LazyMap<number, number>(() => 0);

	for (const line of lines) {
		const from = line.charCodeAt(5);
		const to = line.charCodeAt(36);

		adjacencyList.get(from).push(to);
		// Make sure nodes which don't have any nodes pointing at them are also
		// in the map. Determining the starting nodes becomes as easy as
		// picking all nodes with 0 unresolved in paths.
		unresolvedInPaths.get(from);
		unresolvedInPaths.set(to, unresolvedInPaths.get(to) + 1);
	}

	const queue: number[] = [];
	for (const [key, value] of unresolvedInPaths) {
		if (value === 0) queue.push(key);
	}
	queue.sort();

	return {
		adjacencyList,
		queue,
		unresolvedInPaths
	};
}
