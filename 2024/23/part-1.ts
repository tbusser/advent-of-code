import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): number {
	const graph = parseInput(input);
	graph.log();
	const connections = new Set<string>();

	// Iterate over the unique nodes.
	for (const node of graph.nodes) {
		// Now iterate over all the computers this node is connected to.
		for (const secondNode of graph.getAdjacentNodes(node)) {
			// From the second node, iterate over all the nodes this one is
			// connected to.
			for (const thirdNode of graph.getAdjacentNodes(secondNode)) {
				// Check if the third node is connected to the first node, this
				// completed the triangle, and if at least one of the nodes is
				// for the Chief Historian (node starting with a "t").
				if (
					graph.getAdjacentNodes(thirdNode).includes(node) &&
					(node.startsWith('t') || secondNode.startsWith('t') || thirdNode.startsWith('t'))
				) {
					// Order the nodes to prevent adding duplicates with the
					// nodes in a different order and add it to the set of
					// connected computers.
					connections.add([node, secondNode, thirdNode].sort().join(','));
				}
			}
		}
	}

	// Return the number of unique connections discovered.
	return connections.size;
}

/* ========================================================================== */

export default {
	prompt: 'Number of sets with a connection to a computer starting with a "t"',
	solver
} satisfies Solution;
