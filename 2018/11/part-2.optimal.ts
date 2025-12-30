import { type Input, parseInput, rowLength } from './helpers/parse-input.js';

/* ========================================================================== */

type SummedAreaTable = Int32Array;

/* ========================================================================== */

function buildSummedAreaTable(grid: Input): SummedAreaTable {
	// The grid is 0-based but index in the SAT will be 1-based. The top row and
	// left column will remain empty. This safety border will prevent having to
	// deal with edge cases.
	const size: number = rowLength + 1;
	const table = new Int32Array(size * size);

	for (let y: number = 0; y < rowLength; y++) {
		for (let x: number = 0; x < rowLength; x++) {
			const gridIndex = (y * rowLength) + x;
			const satIndex = ((y + 1) * size) + (x + 1);

			table[satIndex] =
				grid[gridIndex] +
				table[(y * size) + (x + 1)] +
				table[((y + 1) * size) + x] -
				table[(y * size) + x];
		}
	}

	return table;
}

function squareSum(sat: SummedAreaTable, left: number, top: number, size: number): number {
	const satSize: number = rowLength + 1;

	const right: number = left + size;
	const bottom: number = top + size;

	return (
		sat[(bottom * satSize) + right] -
		sat[(top * satSize) + right] -
		sat[(bottom * satSize) + left] +
		sat[(top * satSize) + left]
	);
}

function solver(input: string): string {
	const grid = parseInput(input);
	const sat = buildSummedAreaTable(grid);

	// Track the square with the max power.
	const maxRectangle = { x: 0, y: 0, size: 0, value: 0 };

	for (let size: number = 1; size <= rowLength; size++) {
		const limit: number = rowLength - size + 1;

		for (let y: number = 0; y < limit; y++) {
			for (let x: number = 0; x < limit; x++) {
				const sum = squareSum(sat, x, y, size);
				if (sum > maxRectangle.value) {
					maxRectangle.value = sum;
					maxRectangle.size = size;
					maxRectangle.x = x + 1;
					maxRectangle.y = y + 1;
				}
			}
		}
	}

	return `${maxRectangle.x},${maxRectangle.y},${maxRectangle.size}`;
}

/* ========================================================================== */

export default {
	prompt: 'Coordinate of the top-left fuel cell with the largest total power',
	solver
} satisfies Solution<string>;
