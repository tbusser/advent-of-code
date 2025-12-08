import { type Coordinate, type Input, parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

type Connection = {
	a: string;
	b: string;
	distance: number;
};

/* ========================================================================== */

function calculateDistance(a: Coordinate, b: Coordinate): number {
	return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
}

function solver(input: string): number {
	const junctionBoxes: Input = parseInput(input);
	const connections: Connection[] = [];

	// This makes it easier to switch between the example input and the actual
	// puzzle input.
	const maxNumberOfCables: number = junctionBoxes.length === 1000 ? 1000 : 10;

	// Calculate the distance from each junction to all the other junctions.
	for (let indexA = 0; indexA < junctionBoxes.length - 1; indexA++) {
		for (let indexB = indexA + 1; indexB < junctionBoxes.length; indexB++) {
			connections.push({
				a: junctionBoxes[indexA].id,
				b: junctionBoxes[indexB].id,
				distance: calculateDistance(junctionBoxes[indexA], junctionBoxes[indexB])
			});
		}
	}
	// Sort the connections based on distance in ascending order.
	connections.sort((a, b) => a.distance - b.distance);

	const circuits: number[] = [];
	const junctionToCircuitMap: Record<string, number> = {};

	for (let index = 0; index < maxNumberOfCables; index++) {
		const connection = connections[index];
		// Check if the origin is not yet mapped.
		if (junctionToCircuitMap[connection.a] === undefined) {
			// Check if the destination is not yet mapped.
			if (junctionToCircuitMap[connection.b] === undefined) {
				// Map both junction boxes to a new circuit.
				junctionToCircuitMap[connection.a] = circuits.length;
				junctionToCircuitMap[connection.b] = circuits.length;
				// Initialize the count of the circuit to two junction boxes.
				circuits.push(2);
			} else {
				// Junction box B is already part of a circuit, assign junction
				// box A to the same circuit.
				junctionToCircuitMap[connection.a] = junctionToCircuitMap[connection.b];
				// Grow the circuit with one junction box.
				circuits[junctionToCircuitMap[connection.a]]++;
			}
		} else if (
			junctionToCircuitMap[connection.b] === undefined
		) {
			// Junction box B is not yet part of any circuit, assign it to the
			// same circuit as junction box A and grow the circuit with one box.
			junctionToCircuitMap[connection.b] = junctionToCircuitMap[connection.a];
			circuits[junctionToCircuitMap[connection.a]]++;
		} else if (junctionToCircuitMap[connection.a] !== junctionToCircuitMap[connection.b]) {
			// Both junction box are assigned to a circuit but not to the same
			// circuit. Move all the junction boxes from circuit B to circuit A.
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
		// Ignore the case where junction box A and B are in the same circuit.
		// It does use up a cable (quite the pitfall in the description), but
		// doesn't have any impact other than that.
	}

	// Order the circuits in descending size.
	circuits.sort((a, b) => b - a);

	// Multiply the sizes of the three largest circuits.
	return circuits[0] * circuits[1] * circuits[2];
}

/* ========================================================================== */

export default {
	prompt: 'Multiplying the three largest circuit sizes gives',
	solver
} satisfies Solution;
