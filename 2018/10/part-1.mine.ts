import { chunk } from '@helpers/array.js';
import { modulo } from '@helpers/math.js';
import { type Input, parseInput } from './helpers/parse-input.mine.js';

/* ========================================================================== */

type PreviousState = {
	area: number;
	elapsedTime: number;
	grid: Uint8Array;
	maxX: number;
	maxY: number;
	minX: number;
	minY: number;
};

/* ========================================================================== */

function printPreviousState(state: PreviousState, gridWidth: number) {
	const rowSize = (state.maxX - state.minX + 1);
	const cells = rowSize * (state.maxY - state.minY + 1);
	const text = new Uint8Array(cells);

	for (let y = state.minY; y <= state.maxY; y++) {
		for (let x = state.minX; x <= state.maxX; x++) {
			const originalIndex = (y * gridWidth) + x;
			const textIndex = ((y - state.minY) * rowSize) + (x - state.minX);
			text[textIndex] = state.grid[originalIndex];
		}
	}

	const rows = chunk(Array.from(text), rowSize);
	console.log(`Time: ${state.elapsedTime - 1}s\n`);
	console.log(rows.map(row => row.reduce((result, value) => result + (value ? '#' : '.'), '')).join('\n'));
}

/* ========================================================================== */

function solver(input: string): number {
	const data: Input = parseInput(input);
	const cellCount = data.height * data.width;
	const previousState: PreviousState = {
		area: Infinity,
		elapsedTime: 0,
		grid: new Uint8Array(0),
		maxX: 0,
		maxY: 0,
		minX: 0,
		minY: 0
	};

	let elapsedTime: number = 0;

	while (true) {
		elapsedTime++;
		const grid: Uint8Array = new Uint8Array(cellCount);

		let minX = Infinity;
		let maxX = -Infinity;
		let minY = Infinity;
		let maxY = -Infinity;

		for (let index = 0; index < data.lights.length; index++) {
			const { position, velocity } = data.lights[index];
			const [vX, vY] = velocity;

			position[0] = modulo(position[0] + vX, data.width + 1);
			position[1] = modulo(position[1] + vY, data.height + 1);

			// Update the min and max X and Y values to determine the bounding
			// box for all the lights.
			if (position[0] > maxX) maxX = position[0];
			else if (position[0] < minX) minX = position[0];

			if (position[1] > maxY) maxY = position[1];
			else if (position[1] < minY) minY = position[1];

			const cellIndex = position[0] + (data.width * position[1]);
			grid[cellIndex] = 1;
		}

		// Calculate the area of the bounding box. The assumption is that the
		// area will first shrink till it displays the message and it will grow
		// as soon as the message has been displayed.
		const area = (maxY - minY + 1) * (maxX - minX + 1);
		if (area > previousState.area) {
			printPreviousState(previousState, data.width);
			// Stop generating more states, the message has been found.
			break;
		}

		// Store all generated data for this iteration so it can be used to
		// print this state if it turns out this had the smallest area.
		previousState.area = area;
		previousState.elapsedTime = elapsedTime;
		previousState.grid = grid;
		previousState.maxX = maxX;
		previousState.minX = minX;
		previousState.maxY = maxY;
		previousState.minY = minY;
	}

	return previousState.elapsedTime;
}

/* ========================================================================== */

export default {
	prompt: 'Time needed for the message to appear',
	solver
} satisfies Solution;
