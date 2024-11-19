import { Graph } from '@helpers/graph.js';

/* ========================================================================== */

export function parseInput(input: string): Graph {
	const lines = input.split('\n');
	const graph = new Graph('directed');

	lines.forEach(line => {
		const [
			source,
			,
			direction,
			absoluteScore,
			,
			,
			,
			,
			,
			,
			destination
		] = line.substring(0, line.length - 1).split(' ');

		const distance = (direction === 'lose') ? -Number(absoluteScore) : Number(absoluteScore);
		graph.addEdge(source, destination, distance);
	});

	return graph;
}
