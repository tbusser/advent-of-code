import { chunk } from '@helpers/array.js';
import { type Input, parseInput } from './helpers/parse-input.mine.js';

/* ========================================================================== */

type PreviousState = {
	area: number;
	maxX: number;
	maxY: number;
	minX: number;
	minY: number;
	time: number;
};

/* ========================================================================== */

function printStateAtTimeIndex(previousState: PreviousState, lights: Input['lights']) {
	const rowSize = (previousState.maxX - previousState.minX + 1);
	const cells = rowSize * (previousState.maxY - previousState.minY + 1);
	const message = new Array(cells).fill(' ');

	for (let index = 0; index < lights.length; index++) {
		const { position, velocity } = lights[index];

		const x = position[0] + (velocity[0] * previousState.time);
		const y = position[1] + (velocity[1] * previousState.time);

		const textIndex = (x - previousState.minX) + (rowSize * (y - previousState.minY));
		message[textIndex] = '#';
	}

	const rows = chunk(message, rowSize);
	console.log(rows.map(row => row.join('')).join('\n'));
}

/* ========================================================================== */

function solver(input: string): number {
	const data: Input = parseInput(input);
	const previousState: PreviousState = {
		area: Infinity,
		maxX: 0,
		maxY: 0,
		minX: 0,
		minY: 0,
		time: 0
	};

	let elapsedTime: number = 0;

	while (true) {
		elapsedTime++;

		let minX = Infinity;
		let maxX = -Infinity;
		let minY = Infinity;
		let maxY = -Infinity;

		for (let index = 0; index < data.lights.length; index++) {
			const { position, velocity } = data.lights[index];

			const x = position[0] + (velocity[0] * elapsedTime);
			const y = position[1] + (velocity[1] * elapsedTime);

			// Update the min and max X and Y values to determine the bounding
			// box for all the lights.
			if (x > maxX) maxX = x;
			else if (x < minX) minX = x;

			if (y > maxY) maxY = y;
			else if (y < minY) minY = y;
		}

		// Calculate the area of the bounding box. The assumption is that the
		// area will first shrink till it displays the message and it will grow
		// as soon as the message has been displayed.
		const area = (maxY - minY + 1) * (maxX - minX + 1);
		if (area > previousState.area) {
			printStateAtTimeIndex(previousState, data.lights);
			// Stop generating more states, the message has been found.
			break;
		}

		// Store the bounding box and area for this iteration so it can be used
		// to print this state if it turns out this had the smallest area.
		previousState.area = area;
		previousState.maxX = maxX;
		previousState.minX = minX;
		previousState.maxY = maxY;
		previousState.minY = minY;
		previousState.time = elapsedTime;
	}

	return previousState.time;
}

/* ========================================================================== */

export default {
	prompt: 'Time needed for the message to appear',
	solver
} satisfies Solution;
