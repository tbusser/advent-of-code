import { Graph, WeightMap } from '@helpers/graph.js';

/* ========================================================================== */

function findOptimalPathForLocation(
	location: string,
	graph: Graph,
	predicate: (...lengths: number[]) => number
) {
	const routesLength: number[] = [];
	const destinations = graph.getAdjacentNodes(location);
	const numberOfLocations = graph.nodes.length;

	function walk(path: string[], destinations: WeightMap, distance: number = 0) {
		// When the length of the path equals the number if cities we have
		// completed a route.
		if (path.length === numberOfLocations) {
			// Store the distance of the completed route.
			routesLength.push(distance);

			return;
		}

		// Iterate over the possible destinations of the current path.
		destinations.keys().forEach(destination => {
			// If the current destination is already in the path we skip it, we
			// don't want to visit the same city more than once.
			if (path.includes(destination)) {
				return;
			}

			// Add the current destination to the path.
			const currentPath = [...path, destination];
			// Get the destinations for the current destination.
			const nextDestinations = new Map(graph.getAdjacentNodes(destination));
			// Walk from the current location to all of its destinations.
			walk(currentPath, nextDestinations, distance + destinations.get(destination));
		});
	}

	// Walk all the routes for the current location.
	walk([location], destinations);

	return predicate(...routesLength);
}

export function findOptimalPath(
	graph: Graph,
	predicate: (...lengths: number[]) => number
): number {
	// Iterate over all the locations. Determine per location what the optimal
	// path length is. Return the most optimal path length over all
	// the locations.
	const optimalLengthPerLocation = graph.nodes.map(location => {
		// Get the length of the optimal path of the current location.
		return findOptimalPathForLocation(location, graph, predicate);
	});

	return predicate(...optimalLengthPerLocation);
}
