export type Coordinate = { x: number, y: number, z: number, id: string };
export type Input = Coordinate[];

/* ========================================================================== */

export function parseInput(input: string): Input {
	return input
		.split('\n')
		.map(line => {
			const [x, y, z] = line
				.split(',')
				.map(Number);

			return { x, y, z, id: [x, y, z].join(',') };
		});
}
