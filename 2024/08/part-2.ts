import { Coordinate, parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function findAntinodes(antennas: Coordinate[], size: number, locations: Set<string>): Set<string> {
	function isInBounds(position: number): boolean {
		return (position >= 0 && position < size);
	}

	for (let startIndex = 0; startIndex < antennas.length - 1; startIndex++) {
		const firstAntenna = antennas[startIndex];
		locations.add(`${firstAntenna.column}|${firstAntenna.row}`);

		for (let innerIndex = startIndex + 1; innerIndex < antennas.length; innerIndex++) {
			const secondAntenna = antennas[innerIndex];

			const xDelta = secondAntenna.column - firstAntenna.column;
			const yDelta = secondAntenna.row - firstAntenna.row;

			let column = firstAntenna.column + xDelta;
			let row = firstAntenna.row + yDelta;

			while (isInBounds(column) && isInBounds(row)) {
				locations.add(`${column}|${row}`);
				column += xDelta;
				row += yDelta;
			}

			column = firstAntenna.column - xDelta;
			row = firstAntenna.row - yDelta;

			while (isInBounds(column) && isInBounds(row)) {
				locations.add(`${column}|${row}`);
				column -= xDelta;
				row -= yDelta;
			}
		}
	}

	return locations;
}

async function solver(input: string): Promise<number> {
	const city = parseInput(input);
	const uniqueAntinodeLocations: Set<string> = new Set<string>();

	city.antennaMap.forEach(antennas => {
		findAntinodes(antennas, city.size, uniqueAntinodeLocations);
	});

	return uniqueAntinodeLocations.size;
}

/* ========================================================================== */

export default {
	prompt: 'Number of unique locations containing an antinode',
	solver
} satisfies Solution;
