export type Coordinate = {
	column: number;
	row: number;
};

type City = {
	antennaMap: Coordinate[][];

	/**
	 * The numbers of columns/rows which make up the city map.
	 */
	size: number;
};

/* ========================================================================== */

const emptySpace = '.';

/* ========================================================================== */

export function parseInput(input: string): City {
	const lines = input.split('\n');
	const size = lines.length;

	const antennaMap: Record<string, Coordinate[]> = {};

	for (let row = 0; row < lines.length; row++) {
		for (let column = 0; column < lines[row].length; column++) {
			if (lines[row][column] !== emptySpace) {
				antennaMap[lines[row][column]] ??= [];
				antennaMap[lines[row][column]].push({ column, row });
			}
		}
	}

	return {
		antennaMap: Object.values(antennaMap),
		size
	};
}
