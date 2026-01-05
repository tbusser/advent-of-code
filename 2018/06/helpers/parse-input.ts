type Coordinate = [x: number, y: number];
export type Input = {
	coordinates: Coordinate[];
	height: number;
	width: number;
};

/* ========================================================================== */

export function parseInput(input: string): Input {
	const lines = input.split('\n');

	let maxX = 0;
	let maxY = 0;
	let minX = Infinity;
	let minY = Infinity;

	// Convert each line to a coordinate and keep track of the min and max
	// values encountered. The min and max value can be used to determine the
	// bounding box for the coordinates.
	const coordinates = lines.map(line => {
		const [x, y] = line.split(', ').map(Number) as [number, number];

		if (x > maxX) maxX = x;
		if (y > maxY) maxY = y;
		if (x < minX) minX = x;
		if (y < minY) minY = y;

		return [x, y];
	});

	return {
		// Transpose the coordinate so the top-left coordinate it position at
		// x=0 and y=0.
		coordinates: coordinates.map(([x, y]) => ([x - minX, y - minY])),
		// The height and width are 1 more than the highest index.
		height: maxY - minY + 1,
		width: maxX - minX + 1
	};
}
