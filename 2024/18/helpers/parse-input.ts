import { Coordinate } from '@helpers/grid.js';

/* ========================================================================== */

export function parseInput(input: string): Coordinate[] {
	const lines = input.split('\n');

	return lines.map(lines => {
		const [x, y] = lines.split(',').map(Number);

		return { x, y };
	});
}
