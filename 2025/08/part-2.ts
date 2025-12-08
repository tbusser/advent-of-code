import { type Coordinate, type Input, parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function calculateDistance(a: Coordinate, b: Coordinate): number {
	return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
}

function solver(input: string): number {
	const junctionBoxes: Input = parseInput(input);
	const connections: { a: string, b: string, distance: number }[] = [];

	// Calculate the distance from each to junction to all the other junctions.
	for (let index = 0; index < junctionBoxes.length - 1; index++) {
		for (let inner = index + 1; inner < junctionBoxes.length; inner++) {
			connections.push({
				a: junctionBoxes[index].id,
				b: junctionBoxes[inner].id,
				distance: calculateDistance(junctionBoxes[index], junctionBoxes[inner])
			});
		}
	}

	// Sort the connections based on distance in ascending order.
	connections.sort((a, b) => a.distance - b.distance);

	const circuits: number[] = [];
	const junctionToCircuitMap: Record<string, number> = {};

	for (let index = 0; index < connections.length; index++) {
		const connection = connections[index];
		if (
			junctionToCircuitMap[connection.a] === undefined
		) {
			if (junctionToCircuitMap[connection.b] === undefined) {
				junctionToCircuitMap[connection.a] = circuits.length;
				junctionToCircuitMap[connection.b] = circuits.length;
				circuits.push(2);
			} else {
				junctionToCircuitMap[connection.a] = junctionToCircuitMap[connection.b];
				circuits[junctionToCircuitMap[connection.a]]++;
			}
		} else if (
			junctionToCircuitMap[connection.b] === undefined
		) {
			junctionToCircuitMap[connection.b] = junctionToCircuitMap[connection.a];
			circuits[junctionToCircuitMap[connection.a]]++;
		} else if (junctionToCircuitMap[connection.a] !== junctionToCircuitMap[connection.b]) {
			const circuitSource = junctionToCircuitMap[connection.b];
			const circuitDestination = junctionToCircuitMap[connection.a];
			Object.keys(junctionToCircuitMap).forEach(id => {
				if (junctionToCircuitMap[id] === circuitSource) {
					junctionToCircuitMap[id] = circuitDestination;
				}
			});
			// Add the size of the source circuit to the destination circuit.
			circuits[circuitDestination] += circuits[circuitSource];
			// Reset the size of the source circuit but don't delete it.
			// Deleting it will cause all indexed to be wrong.
			circuits[circuitSource] = 0;
		}

		// When the size of the circuit the current connection belongs to
		// matches the total number of junction boxes we can stop processing
		// further connections. The circuit is complete.
		if (circuits[junctionToCircuitMap[connection.a]] === junctionBoxes.length) {
			return Number(connection.a.split(',')[0]) * Number(connection.b.split(',')[0]);
		}
	}

	return -1;
}

/* ========================================================================== */

export default {
	prompt: 'Multiplying the three largest circuit sizes gives',
	solver
} satisfies Solution;
