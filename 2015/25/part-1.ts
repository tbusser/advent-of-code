import { Coordinate, parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function findCodeAtCoordinate(coordinate: Coordinate): number {
	let column = 1;
	let row = 1;
	let maxRow = 1;
	let value = 20151125;

	while (true) {
		if (column === coordinate.column && row === coordinate.row) {
			return value;
		}

		column++;
		row--;
		value = (value * 252533) % 33554393;

		if (row <= 0) {
			maxRow++;
			row = maxRow;
			column = 1;
		}
	}
}

/* -------------------------------------------------------------------------- */

async function solver(input: string): Promise<number> {
	const targetCell = parseInput(input);

	return findCodeAtCoordinate(targetCell);
}

/* ========================================================================== */

export default {
	prompt: 'The code to give to the machine is',
	solver
} satisfies Solution;
