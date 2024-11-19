import { calculateMaximumHappiness } from './helpers/calculate-max-happiness.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

const self = 'self';

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	const graph = parseInput(input);

	function insertSelf(person: string) {
		graph.addEdge(person, self, 0);
		graph.addEdge(self, person, 0);
	}

	graph.nodes.forEach(insertSelf);

	return calculateMaximumHappiness(graph);
}

/* ========================================================================== */

export default {
	prompt: 'total change in happiness',
	solver
} satisfies Solution;
