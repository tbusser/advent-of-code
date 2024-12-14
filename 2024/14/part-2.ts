import { parseInput, Robot } from './helpers/parse-input.js';

/* ========================================================================== */

const height = 103;
const width = 101;

/* ========================================================================== */

function moveRobot(robot: Robot, moves: number) {
	robot.x = (robot.x + (robot.deltaX * moves)) % width;
	robot.y = (robot.y + (robot.deltaY * moves)) % height;

	if (robot.x < 0) robot.x += width;
	if (robot.y < 0) robot.y += height;
}

function logRobots(robots: Robot[], seconds: number) {
	const grid = new Array(height).fill(undefined);
	for (let index = 0; index < height; index++) {
		grid[index] = new Array(width).fill(0);
	}

	for (const robot of robots) {
		grid[robot.y][robot.x] += 1;
	}

	const stringGrid = grid.reduce((result, row) => result + row.map(i => i === 0 ? '.' : i).join('') + '\n', '');

	console.log(`==[ ${seconds} ]=============================================`);
	console.log(stringGrid);
}


/* ========================================================================== */

function solver(input: string): number {
	const robots = parseInput(input);
	let seconds: number = 0;

	while (true) {
		for (const robot of robots) {
			moveRobot(robot, 1);
		}

		seconds++;

		let matches: number = 0;
		for (const robot of robots) {
			const pattern = robots.filter(candidate => {
				if (
					candidate.y === robot.y + 1 &&
					candidate.x >= robot.x - 1 && candidate.x <= robot.x + 1
				) return true;

				if (
					candidate.y === robot.y + 2 &&
					candidate.x >= robot.x - 2 && candidate.x <= robot.x + 2
				) return true;

				return false;
			});
			if (pattern.length === 8) matches++;
		}
		if (matches > 1) {
			logRobots(robots, seconds);

			return seconds;
		};
	}
}

/* ========================================================================== */

export default {
	prompt: 'The fewest seconds that must elapse for the Easter egg to appear',
	solver
} satisfies Solution;
