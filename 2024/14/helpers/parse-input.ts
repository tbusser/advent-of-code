export type Robot = {
	deltaX: number;
	deltaY: number;
	x: number;
	y: number;
};

/* ========================================================================== */

const numberRegex = /-?\d+/g;

/* ========================================================================== */

export function parseInput(input: string): Robot[] {
	const lines = input.split('\n');

	return lines.map(line => {
		const [x, y, deltaX, deltaY] = line.match(numberRegex).map(Number);

		return { deltaX, deltaY, x, y };
	});
}
