import { UnweightedGraph as Graph } from '@helpers/unweighted-graph.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function findLargestNetwork(seedIndex: number, graph: Graph) {
	const nodeCount = new Map<string, number>();
	// Iterate over all the nodes the seed connects to.
	for (const child of graph.getAdjacentNodes(graph.nodes[seedIndex])) {
		// Increase the count of the child node.
		nodeCount.set(child, (nodeCount.get(child) ?? 0) + 1);
		// Iterate over all the nodes the child connects to.
		for (const grandchild of graph.getAdjacentNodes(child)) {
			nodeCount.set(grandchild, (nodeCount.get(grandchild) ?? 0) + 1);
		}
	}

	// The seed node will always have the highest number of nodes it is
	// connecting to. The other nodes which are part of its network will all
	// have a count which is one less.
	const threshold = nodeCount.get(graph.nodes[seedIndex]) - 1;

	// Now take all the keys and filter out those keys whose count is equal to
	// or higher than the determined threshold. These are all the nodes which
	// are interconnected.
	return nodeCount.keys()
		.toArray()
		.filter(key => nodeCount.get(key) >= threshold);
}

/* -------------------------------------------------------------------------- */

function solver(input: string): string {
	const graph = parseInput(input);

	let largestNetwork = [];
	// Iterate over all the nodes in the graph.
	for (let index = 0; index < graph.nodes.length; index++) {
		// Find the largest network for the current node.
		const result = findLargestNetwork(index, graph);
		// If the network is larger than the known network, keep the result.
		if (result.length > largestNetwork.length) largestNetwork = result;
	}

	// Sort the nodes and join them together, this will be the password.
	return largestNetwork.sort().join(',');
}

/* ========================================================================== */

export default {
	prompt: 'The password for the LAN party is',
	solver
} satisfies Solution<string>;
