import { parseInput } from './helpers/parse-input.js';
import { modulo } from '@helpers/math.js';

/* ========================================================================== */

const numberOfPositions: number = 100;

/* -------------------------------------------------------------------------- */

function countZeroCrossings(startPosition: number, distance: number): number {
	// Calculate the number of full rotations covered by the distance.
	// Example: For a distance of 204, the dial will make 2 full rotations.
	const fullRotations: number = Math.floor(Math.abs(distance) / numberOfPositions);
	// Calculate the distance when we exclude the full rotations.
	// Example: For a distance of 204, the dial will move 4 positions when we
	//          exclude the full rotations.
	const incompleteRotationDistance: number = (Math.abs(distance) % numberOfPositions) * Math.sign(distance);
	// The position the dial will be in when we move it the incomplete rotation
	// distance.
	const endPosition: number = startPosition + incompleteRotationDistance;

	// When the end position is below 0 we should've be passed the 0 position
	// once. This is true except when we started at 0, in this case we never
	// passed the 0 position.
	const belowStartCorrection: number = (endPosition < 0 && startPosition !== 0) ? 1 : 0;
	// If the end position is over the number of positions, we will wrap back to
	// 0 and thus the 0 position was seen once.
	const overEndCorrection: number = endPosition > numberOfPositions ? 1 : 0;
	// When the dial ends at 0 or at 100 (which becomes 0 after correction) we
	// have seen the 0 position once.
	const perfectEndCorrection: number = (endPosition % numberOfPositions === 0) ? 1 : 0;

	return fullRotations + belowStartCorrection + overEndCorrection + perfectEndCorrection;
}

/* -------------------------------------------------------------------------- */

function solver(input: string): number {
	const instructions: number[] = parseInput(input);

	let position: number = 50;
	let count: number = 0;

	for (const distance of instructions) {
		count += countZeroCrossings(position, distance);
		position = modulo(position + distance, numberOfPositions);
	}

	return count;
}

/* ========================================================================== */

export default {
	prompt: 'Password to open the door',
	solver,
} satisfies Solution;
