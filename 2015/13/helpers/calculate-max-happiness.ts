import { Graph, WeightMap } from '@helpers/graph.js';

/* ========================================================================== */

function findSeatingArrangements(graph: Graph, startNode: string) {
	const happinessScores: number[] = [];
	const maxPathLength = graph.nodes.length + 1;

	function walk(path: string[], adjacentNodes: WeightMap, happiness: number) {
		adjacentNodes.keys().forEach(person => {
			// If the path is complete except for the final step back to the
			// starting person, exit the iteration when the current node is not
			// for the starting person.
			if (path.length === graph.nodes.length && person !== path[0]) return;

			// As long as not all people have been seated we can skip any
			// iteration for a person who is already at the table.
			if (path.length !== graph.nodes.length && path.includes(person)) return;

			// Create a new path array with all the steps up to here and the
			// current person.
			const currentPath = [...path, person];
			// Add the happiness score from the previous person to the
			// current person.
			let newHappiness = happiness + adjacentNodes.get(person);

			// Get the last visited person
			const lastNode = path.at(-1);
			// Get the adjacent persons for the current persons.
			const adjacentPersons = graph.getAdjacentNodes(person);
			// Add the happiness score from the current person back to the
			// previous person.
			newHappiness += adjacentPersons.get(lastNode);

			// Check if the max path length has been reached. When it has been
			// reached we've come full circle and now the happiness score for
			// the current seating arrangement.
			if (currentPath.length === maxPathLength) {
				happinessScores.push(newHappiness);
				return;
			}

			// Visit the next neighbor.
			walk(currentPath, adjacentPersons, newHappiness);
		});
	}

	// Start walking from the first person.
	walk([startNode], graph.getAdjacentNodes(startNode), 0);

	return happinessScores;
}

export function calculateMaximumHappiness(
	graph: Graph
): number {
	// Because the seating arrangements are a circle the begin and end point are
	// not important. If the happiness scores are calculated for all
	// arrangements with person A as the start, we know the scores for all the
	// other starting persons too.
	const happinessPerArrangement = findSeatingArrangements(graph, graph.nodes[0]);

	// Return the maximum score.
	return Math.max(...happinessPerArrangement);
}
