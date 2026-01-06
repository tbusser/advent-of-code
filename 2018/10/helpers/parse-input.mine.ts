type Light = {
	position: [x: number, y: number];
	velocity: [x: number, y: number];
};
export type Input = {
	height: number;
	lights: Light[];
	width: number;
};

/* ========================================================================== */

const regex = /(-?\d+).*?(-?\d+).*?(-?\d+).*?(-?\d+)/;

/* ========================================================================== */

export function parseInput(input: string): Input {
	const lines = input.split('\n');

	let maxX: number = -Infinity;
	let maxY: number = -Infinity;
	let minX: number = Infinity;
	let minY: number = Infinity;

	// Convert each line to a Light and keep keep track of the min and max
	// values encountered. The min and max value can be used to determine the
	// bounding box for the coordinates.
	const intermediateResult = lines.map(line => {
		const [, x, y, vX, vY] = line.match(regex).map(Number);

		if (x > maxX) maxX = x;
		if (y > maxY) maxY = y;
		if (x < minX) minX = x;
		if (y < minY) minY = y;

		return {
			position: [x, y],
			velocity: [vX, vY]
		} satisfies Light;
	});

	return {
		// The height is one more than the max index encountered.
		height: maxY - minY + 1,
		// Transpose the coordinate so the top-left coordinate it positioned at
		// x=0 and y=0.
		lights: intermediateResult.map(item => {
			item.position[0] -= minX;
			item.position[1] -= minY;

			return item;
		}),
		// The width is one more than the max index encountered.
		width: maxX - minX + 1
	};
}
