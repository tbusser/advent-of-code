import { findKClosestPairs } from './helpers/find-closest-pairs.js';
import { type Input, parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

type Connection = {
	a: string;
	b: string;
	distance: number;
};

/* ========================================================================== */

function solver(input: string): number {
	const junctionBoxes: Input = parseInput(input);
	// This makes it easier to switch between the example input and the actual
	// puzzle input.
	const maxNumberOfCables: number = junctionBoxes.length === 1000 ? 1000 : 10;
	const connections: Connection[] = findKClosestPairs(junctionBoxes, maxNumberOfCables);

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
			const circuitToMove = junctionToCircuitMap[connection.b];
			Object.keys(junctionToCircuitMap).forEach(id => {
				if (junctionToCircuitMap[id] === circuitToMove) {
					junctionToCircuitMap[id] = junctionToCircuitMap[connection.a];
				}
			});
			circuits[junctionToCircuitMap[connection.a]] += circuits[circuitToMove];
			circuits[circuitToMove] = 0;
		}
	}

	circuits.sort((a, b) => b - a);

	return circuits[0] * circuits[1] * circuits[2];
}

/* ========================================================================== */

export default {
	prompt: 'Multiplying the three largest circuit sizes gives',
	solver
} satisfies Solution;
