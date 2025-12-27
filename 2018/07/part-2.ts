import { parseInput } from './helpers/parse-input.optimal.js';

/* ========================================================================== */

type Worker = {
	node: number;
	processingTime: number;
};

/* ========================================================================== */

/**
 * The base time it takes to process a node.
 */
const baseProcessingTime = 60;

/**
 * Nodes are the ASCII values of letters. For the processing time, we need to
 * add the letter's ordinal position to the base time. To convert from ASCII to
 * an ordinal value, subtract 64. For example: A is ASCII 65, so 65 - 64 = 1.
 */
const letterToOrdinalCorrection = 64;

/**
 * The maximum number of workers available to work in parallel.
 */
const maxWorkers: number = 5;

/* ========================================================================== */


function solver(input: string): number {
	const { adjacencyList, queue, unresolvedInPaths } = parseInput(input);
	// Create up to the max number of workers based on items in the queue.
	let workers: Worker[] = queue
		.splice(0, maxWorkers)
		.map(node => ({ node, processingTime: baseProcessingTime + (node - letterToOrdinalCorrection) }));
	let totalTime: number = 0;

	// As long as there are active workers keep on going.
	while (workers.length > 0) {
		const nextWorkers: Worker[] = [];
		// Sort the workers so the node which takes the least processing time is
		// at the front.
		workers.sort((a, b) => a.processingTime - b.processingTime);
		// Get the time needed to wait for the first node to be done.
		const timeForFirstNode = workers[0].processingTime;
		// Advance the total time spent on processing units.
		totalTime += timeForFirstNode;

		for (const { node, processingTime } of workers) {
			// Check if the worker has finished processing the node.
			if (processingTime - timeForFirstNode === 0) {
				// Get the neighbors of the processed node and add them to the
				// queue when they have no unresolved in paths.
				for (const neighbor of adjacencyList.get(node)) {
					unresolvedInPaths.set(neighbor, unresolvedInPaths.get(neighbor) - 1);
					if (unresolvedInPaths.get(neighbor) === 0) queue.push(neighbor);
				}
			} else {
				// The node is not done processing, add it to the new workers
				// and decrease its processing time by the time spent on
				// processing the unit which got completed.
				nextWorkers.push({ node, processingTime: processingTime - timeForFirstNode });
			}
		}
		// Sort the queue so we are sure the nodes are in alphabetical order.
		queue.sort();

		// As long as there are workers available and there are items in the
		// queue, create new workers.
		while (nextWorkers.length < maxWorkers && queue.length > 0) {
			const node = queue.shift();
			nextWorkers.push({ node, processingTime: baseProcessingTime + (node - letterToOrdinalCorrection) });
		}

		// Replace the old workers with the new workers.
		workers = nextWorkers;
	}

	return totalTime;
}

/* ========================================================================== */

export default {
	prompt: 'Seconds needed to complete all steps',
	solver
} satisfies Solution;
