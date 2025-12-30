import { parseInput, rowLength } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): string {
	const grid = parseInput(input);
	// Last index to check to avoid going past bottom/right edges for
	// 3x3 squares.
	const maxIndex: number = rowLength * rowLength - (1 * rowLength) - 1;

	// Track the 3x3 square with the max power.
	const maxRectangle = { x: 0, y: 0, value: 0 };
	// Sliding window: sum of the last 3 columns for current 3x3 square
	const columnValues: number[] = new Array(3);
	// Tracks which column sum to overwrite in the sliding window
	let columnIndex: number = 0;
	let index: number = 0;

	// Keep looping till we've gone past the last index we need to process.
	while (index < maxIndex) {
		const x: number = index % rowLength;
		const y: number = (index / rowLength) | 0;

		// At new row, precompute first two column sums for sliding window.
		if (x === 0) {
			// Calculate the sums for the first two columns.
			columnValues[0] = grid[index] + grid[index + rowLength] + grid[index + rowLength + rowLength];
			columnValues[1] = grid[index + 1] + grid[index + 1 + rowLength] + grid[index + 1 + rowLength + rowLength];
			// Reset the index for the next column value to replace.
			columnIndex = 2;
			// Move the index ahead by 2, the first columns on the row have
			// already been processed.
			index += 2;
		}

		// Calculate the power level for the square.
		columnValues[columnIndex] = grid[index] + grid[index + rowLength] + grid[index + rowLength + rowLength];
		const sum: number = columnValues[0] + columnValues[1] + columnValues[2];

		if (sum > maxRectangle.value) {
			maxRectangle.value = sum;
			// x represents the right position of the square and we need the
			// left position. Normally we'd have to subtract 2 but since our
			// coordinates are 0 based and those in the challenge are 1 based,
			// the correct value is reached by subtracting 1.
			maxRectangle.x = x - 1;
			// Add 1 to correct from 0 based to 1 based coordinates.
			maxRectangle.y = y + 1;
		}

		// Point the index of the sum of the left most column, this will be
		// overwritten in the next iteration.
		columnIndex = (columnIndex + 1) % 3;

		index++;
	}

	return `${maxRectangle.x},${maxRectangle.y}`;
}

/* ========================================================================== */

export default {
	prompt: 'Coordinate of the top-left fuel cell with the largest total power',
	solver
} satisfies Solution<string>;
