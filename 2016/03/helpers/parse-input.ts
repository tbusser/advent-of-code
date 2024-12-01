export type Points = number[];

/* ========================================================================== */

export function parseInput(input: string): Points[] {
	const lines = input.replace(/ +/g, ' ').split('\n');

	return lines.map(line => line.trim().split(' ').map(Number));
}

export function parseInputAsColumns(input: string): Points[] {
	const lines = input.replace(/ +/g, ' ').split('\n');

	// One array for each of the three columns.
	const columns: Points[] = [[], [], []];

	lines.forEach(line => {
		const [pointA, pointB, pointC] = line.trim().split(' ').map(Number);

		columns[0].push(pointA);
		columns[1].push(pointB);
		columns[2].push(pointC);
	});

	return columns;
}
