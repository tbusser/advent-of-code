export type Input = Int8Array;

/* ========================================================================== */

export const rowLength: number = 300;
const gridSize: number = rowLength * rowLength;

/* ========================================================================== */

export function parseInput(input: string): Input {
	const serialNumber = Number(input);
	const grid = new Int8Array(gridSize);

	// Fill grid with power levels based on the serial number.
	for (let index: number = 0; index < gridSize; index++) {
		const x: number = (index % rowLength) + 1;
		const y: number = ((index / rowLength) | 0) + 1;

		const rackId: number = x + 10;
		const powerLevel: number = ((rackId * y) + serialNumber) * rackId;
		const hundredDigit: number = ((powerLevel % 1000) / 100) | 0;

		grid[index] = hundredDigit - 5;
	}

	return grid;
}
