import { Racetrack } from './helpers/racetrack.js';

/* ========================================================================== */

function solver(input: string): number {
	const racetrack = Racetrack.createInstance(input);

	return racetrack.findCheats(100, 20);
}

/* ========================================================================== */

export default {
	prompt: 'Number of cheats of at least 100 picoseconds',
	solver
} satisfies Solution;
