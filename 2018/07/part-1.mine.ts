import { type Input, parseInput } from './helpers/parse-input.mine.js';
import { BinaryHeap } from '@helpers/BinaryHeap.js';

/* ========================================================================== */

function solver(input: string): string {
	const data: Input = parseInput(input);

	const priorityQueue = BinaryHeap.fromArray(data.start, (a: string, b: string) => a.charCodeAt(0) - b.charCodeAt(0));
	const path: string[] = [];

	while (!priorityQueue.isEmpty()) {
		const node = priorityQueue.pop();
		path.push(node);
		const neighbors = data.graph.getAdjacentNodes(node);
		if (neighbors !== undefined) {
			for (const neighbor of neighbors) {
				data.preconditionSet[neighbor]--;
				if (data.preconditionSet[neighbor] === 0) {
					priorityQueue.push(neighbor);
				}
			}
		}
	}

	return path.join('');
}

/* ========================================================================== */

export default {
	prompt: 'The order the steps should be completed in',
	solver
} satisfies Solution<string>;
