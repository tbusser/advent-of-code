import { ReindeerMaze } from './helpers/reindeer-maze.js';

/* ========================================================================== */

function solver(input: string): number {
	const maze = ReindeerMaze.createInstance(input);

	return maze.findLowestScore();
}

/* ========================================================================== */

export default {
	prompt: 'The lowest score a reindeer could achieve is',
	solver
} satisfies Solution;
