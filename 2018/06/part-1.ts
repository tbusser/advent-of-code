import { type Input, parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): number {
	const data: Input = parseInput(input);
	// Keep track per coordinate what its area size is.
	const areaSize = new Int16Array(data.coordinates.length).fill(0);
	// Coordinates that touch the bounding box have infinite areas.
	const infiniteCoordinates = new Set<number>();

	const cellCount = data.width * data.height;
	for (let index = 0; index < cellCount; index++) {
		const cellX = index % data.width;
		const cellY = (index / data.width) | 0;

		let shortestDistance = Infinity;
		let shortestCoordinateIndex: number | undefined;

		for (let coordinateIndex = 0; coordinateIndex < data.coordinates.length; coordinateIndex++) {
			const [coordinateX, coordinateY] = data.coordinates[coordinateIndex];
			const distance = Math.abs(coordinateX - cellX) + Math.abs(coordinateY - cellY);
			if (distance < shortestDistance) {
				shortestDistance = distance;
				shortestCoordinateIndex = coordinateIndex;
			} else if (distance === shortestDistance) {
				// According the the challenge description, cells with more than
				// one coordinate at the same distance do not count towards
				// an area.
				shortestCoordinateIndex = undefined;
			}
		}

		if (shortestCoordinateIndex !== undefined) {
			areaSize[shortestCoordinateIndex]++;

			// Check if the cell is at the edge of the grid; if it is the
			// coordinate we've found extends infinitely.
			if (
				cellX === 0 ||
				cellX === data.width - 1 ||
				cellY === 0 ||
				cellY === data.height - 1) {
				infiniteCoordinates.add(shortestCoordinateIndex);
			}
		}
	}

	let largestArea = 0;
	for (let index = 0; index < areaSize.length; index++) {
		if (!infiniteCoordinates.has(index) && areaSize[index] > largestArea) largestArea = areaSize[index];
	}

	return largestArea;
}

/* ========================================================================== */

export default {
	prompt: 'Size of the largest area',
	solver
} satisfies Solution;
