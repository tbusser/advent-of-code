import { parseInput, rowLength } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): string {
	const grid = parseInput(input);

	// Track the square with the max power.
	const maxRectangle = { x: 0, y: 0, size: 0, value: 0 };

	for (let size: number = 1; size <= rowLength; size++) {
		// Last index to check to avoid going past bottom/right edges for
		// 3x3 squares.
		const maxIndex: number = rowLength * rowLength - ((size - 1) * rowLength) - 1;
		// Sliding window: sum of the last 3 columns for current 3x3 square
		const columnValues: number[] = new Array(size);

		// Tracks which column sum to overwrite in the sliding window
		let columnIndex: number = 0;
		let index: number = 0;
		let sum: number = 0;

		// Keep looping till we've gone past the last index we need to process.
		while (index < maxIndex) {
			const x: number = index % rowLength;
			const y: number = (index / rowLength) | 0;

			// At new row, precompute first two column sums for sliding window.
			if (x === 0) {
				sum = 0;

				for (let column: number = 0; column < size - 1; column++) {
					columnValues[column] = 0;
					for (let row: number = 0; row < size; row++) {
						columnValues[column] += grid[index + column + (row * rowLength)];
					}
					sum += columnValues[column];
				}

				// Reset the index for the next column value to replace.
				columnIndex = size - 1;
				// Move the index ahead by 2, the first columns on the row have
				// already been processed.
				index += size - 1;
			}

			columnValues[columnIndex] = 0;
			for (let row: number = 0; row < size; row++) {
				columnValues[columnIndex] += grid[index + (row * rowLength)];
			}

			sum += columnValues[columnIndex];

			if (sum > maxRectangle.value) {
				maxRectangle.size = size;
				maxRectangle.value = sum;
				// x represents the right position of the square and we need the
				// left position. Normally we'd have to subtract 2 but since our
				// coordinates are 0 based and those in the challenge are 1
				// based, the correct value is reached by subtracting 1.
				maxRectangle.x = x - size + 2;
				// Add 1 to correct from 0 based to 1 based coordinates.
				maxRectangle.y = y + 1;
			}

			// Point the index of the sum of the left most column, this will be
			// overwritten in the next iteration.
			columnIndex = (columnIndex + 1) % columnValues.length;
			sum -= columnValues[columnIndex];

			index++;
		}
	}

	return `${maxRectangle.x},${maxRectangle.y},${maxRectangle.size}`;
}

/* ========================================================================== */

export default {
	prompt: 'Coordinate of the top-left fuel cell with the largest total power',
	solver
} satisfies Solution<string>;
