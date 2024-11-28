export type Coordinate = {
	column: number;
	row: number;
};

/* ========================================================================== */

export function parseInput(input: string): Coordinate {
	const [row, column] = input.match(/\d+/g).map(Number);

	return {
		column,
		row
	} satisfies Coordinate;
}
