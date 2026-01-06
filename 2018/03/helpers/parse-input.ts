export type RawClaim = [left: number, top: number, width: number, height: number];
export type Claim = [start: number, end: number][];
export type Input = {
	cells: number;
	claims: Claim[];
};

/* ========================================================================== */

const regex = /(\d+),(\d+): (\d+)x(\d+)/;

/* ========================================================================== */

export function parseInput(input: string): Input {
	const lines: string[] = input.split('\n');

	let maxX: number = 0;
	let maxY: number = 0;
	// Parse each line into left, top, width, and height; track maximum X and Y
	// to determine the total grid size.
	const rawClaims: RawClaim[] = lines.map(line => {
		const [, ...info] = line.match(regex);
		const [left, top, width, height] = info.map(Number);

		maxX = Math.max(left + width, maxX);
		maxY = Math.max(top + height, maxY);

		return [left, top, width, height];
	});

	// Convert each raw claim to an array of rows. Per row, store the index of
	// the first and last cell.
	const claims: Claim[] = rawClaims.map(rawClaim => {
		const ranges = [];

		for (let row = 0; row < rawClaim[3]; row++) {
			const start: number = maxX * (rawClaim[1] + row) + rawClaim[0];
			ranges.push([start, start + rawClaim[2] - 1]);
		}

		return ranges;
	});

	return { cells: maxX * maxY, claims };
}
