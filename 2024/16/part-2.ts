import { ReindeerMaze } from './helpers/reindeer-maze.js';

/* ========================================================================== */

function solver(input: string): number {
	const maze = ReindeerMaze.createInstance(input);

	return maze.findNumberOfTiles();
}

/* ========================================================================== */

export default {
	prompt: 'Number of tiles part of at least one best path',
	solver
} satisfies Solution;
