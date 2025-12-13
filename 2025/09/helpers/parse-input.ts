export type Coordinate = {
	x: number;
	y: number;
};

export type Input = Coordinate[];

/* ========================================================================== */

export function parseInput(input: string): Input {
	return input.split('\n').map(line => {
		const [x, y] = line.split(',').map(Number);

		return { x, y };
	});
}
