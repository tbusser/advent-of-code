import { parseInput, Robot } from './helpers/parse-input.js';

/* ========================================================================== */

const numberOfMoves = 100;

const height = 103;
const halfHeight = (height - 1) / 2;
const width = 101;
const halfWidth = (width - 1) / 2;

/* ========================================================================== */

function moveRobot(robot: Robot, moves: number) {
	robot.x = (robot.x + (robot.deltaX * moves)) % width;
	robot.y = (robot.y + (robot.deltaY * moves)) % height;

	if (robot.x < 0) robot.x += width;
	if (robot.y < 0) robot.y += height;
}

/* ========================================================================== */

function solver(input: string): number {
	const robots = parseInput(input);
	const quadrants = [0, 0, 0, 0];

	for (const robot of robots) {
		moveRobot(robot, numberOfMoves);


		if (robot.x === halfWidth || robot.y === halfHeight) {
			continue;
		}

		let quadrant = 0;
		if (robot.x > halfWidth) quadrant++;
		if (robot.y > halfHeight) quadrant += 2;
		quadrants[quadrant]++;
	}

	return quadrants.reduce((total, quadrant) => total * quadrant, 1);
}

/* ========================================================================== */

export default {
	prompt: 'The safety factor after 100 seconds is',
	solver
} satisfies Solution;
