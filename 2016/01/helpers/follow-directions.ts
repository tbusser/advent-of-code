import { Coordinate, Instruction } from './types.js';

/* ========================================================================== */

/**
 * The array contains the instructions on what to do for each direction. The
 * order in the array is: north, east, south, and west.
 *
 * The value is made up as follow:
 * - The ones digit is the horizontal movement. A positive number means a move
 *   to the east, a negative number is a move to the west.
 * - The tens digit is the vertical movement. A positive number means a move to
 *   the north, a negative number a move to the south.
 */
const directions = [10, 1, -10, -1];

/* ========================================================================== */

function determineNewDirection(index: number, turn: number): number {
	index += turn;

	if (index < 0) return 3;
	if (index > 3) return 0;

	return index;
}

/* -------------------------------------------------------------------------- */

export function followRoute(route: Instruction[]): Coordinate[] {
	let direction = 0;
	const position: Coordinate = { x: 0, y: 0 };
	const path: Coordinate[] = [{ ...position }];

	for (const { steps, turn } of route) {
		direction = determineNewDirection(direction, turn);
		position.x += (directions[direction] % 10) * steps;
		position.y += Math.round(directions[direction] / 10) * steps;
		path.push({ ...position });
	}

	return path;
}
