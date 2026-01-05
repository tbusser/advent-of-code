import { type Input, parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

const limit: number = 10000;

/* ========================================================================== */

function solver(input: string): number {
	const data: Input = parseInput(input);
	let areaSize: number = 0;

	const cellCount = data.width * data.height;
	for (let index = 0; index < cellCount; index++) {
		const cellX = index % data.width;
		const cellY = (index / data.width) | 0;

		let totalDistance: number = 0;
		for (let coordinateIndex = 0; coordinateIndex < data.coordinates.length; coordinateIndex++) {
			const [coordinateX, coordinateY] = data.coordinates[coordinateIndex];
			totalDistance += Math.abs(coordinateX - cellX) + Math.abs(coordinateY - cellY);

			if (totalDistance >= limit) break;
		}

		if (totalDistance < limit) areaSize++;
	}

	return areaSize;
}

/* ========================================================================== */

export default {
	prompt: 'Size of the region',
	solver
} satisfies Solution;
