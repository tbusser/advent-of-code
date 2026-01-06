type Light = {
	position: [x: number, y: number];
	velocity: [x: number, y: number];
};
export type Input = Light[];

/* ========================================================================== */

const regex = /(-?\d+).*?(-?\d+).*?(-?\d+).*?(-?\d+)/;

/* ========================================================================== */

export function parseInput(input: string): Input {
	const lines = input.split('\n');

	return lines.map(line => {
		const [, x, y, vX, vY] = line.match(regex).map(Number);

		return {
			position: [x, y],
			velocity: [vX, vY]
		} satisfies Light;
	});
}
