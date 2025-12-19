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
	const rawClaims = lines.map(line => {
		const [_, ...info] = line.match(regex);
		const [left, top, width, height] = info.map(Number);

		if (left + width > maxX) maxX = left + width;
		if (top + height > maxY) maxY = top + height;

		return { left, top, width, height };
	});

	const claims = rawClaims.map(rawClaim => {
		const ranges = [];

		for (let row = 0; row < rawClaim.height; row++) {
			const start: number = maxX * (rawClaim.top + row) + rawClaim.left;
			ranges.push([start, start + rawClaim.width - 1]);
		}

		return ranges;
	});

	return { claims, cells: maxX * maxY };
}
