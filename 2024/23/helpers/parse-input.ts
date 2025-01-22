import { UnweightedGraph } from '@helpers/unweighted-graph.js';

/* ========================================================================== */

export function parseInput(input: string): UnweightedGraph {
	const lines = input.split('\n');
	const connections = lines.map(line => line.split('-'));
	const graph = new UnweightedGraph('undirected');

	// Create the graph of all the computers. The distance is of no importance
	// for this challenge.
	connections.forEach(route => graph.addEdge(route[0], route[1]));

	return graph;
}
