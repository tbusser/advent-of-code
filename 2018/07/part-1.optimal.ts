import { parseInput } from './helpers/parse-input.optimal.js';

/* ========================================================================== */

function solver(input: string): string {
	const { adjacencyList, queue, unresolvedInPaths } = parseInput(input);
	const path: string[] = [];

	while (queue.length > 0) {
		const node = queue.shift();
		path.push(String.fromCharCode(node));

		for (const neighbor of adjacencyList.get(node)) {
			unresolvedInPaths.set(neighbor, unresolvedInPaths.get(neighbor) - 1);
			if (unresolvedInPaths.get(neighbor) === 0) queue.push(neighbor);
		}
		queue.sort();
	}

	return path.join('');
}

/* ========================================================================== */

export default {
	prompt: 'The order the steps should be completed in',
	solver
} satisfies Solution<string>;
