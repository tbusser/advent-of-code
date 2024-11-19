import { Graph } from '@helpers/graph.js';

/* ========================================================================== */

export function parseInput(input: string): Graph {
	const lines = input.split('\n');
	const graph = new Graph('undirected');

	lines.forEach(line => {
		const [source, , destination, , distance] = line.split(' ');
		graph.addEdge(source, destination, Number(distance));
	});

	return graph;
}
