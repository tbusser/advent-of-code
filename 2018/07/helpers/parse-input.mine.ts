import { UnweightedGraph } from '@helpers/unweighted-graph.js';

/* ========================================================================== */

export type Input = {
	graph: UnweightedGraph;
	preconditionSet: Record<string, number>;
	start: string[];
};

/* ========================================================================== */

const regex = / ([A-Z]).* ([A-Z])/;

/* ========================================================================== */

export function parseInput(input: string): Input {
	const graph = new UnweightedGraph('directed');

	const lines = input.split('\n');
	const fromSet = new Set<string>();
	const toSet = new Set<string>();
	const preconditionSet = {};

	lines.forEach(line => {
		const [, from, to] = line.match(regex);
		fromSet.add(from);
		toSet.add(to);
		preconditionSet[to] = (preconditionSet[to] ?? 0) + 1;
		graph.addEdge(from, to);
	});

	return {
		graph,
		preconditionSet,
		start: fromSet.difference(toSet).values().toArray()
	};
}
