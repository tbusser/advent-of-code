import { parseInput, Reindeer } from './helpers/parse-input.js';

/* ========================================================================== */

function calculateDistance(reindeer: Reindeer, duration: number): number {
	const completedCycles = Math.floor((duration) / reindeer.cycleTime);
	const leftOverCycle = duration % reindeer.cycleTime;
	const leftOverFlightTime = Math.min(reindeer.flightTime, leftOverCycle);

	return (completedCycles * reindeer.cycleDistance) + (leftOverFlightTime * reindeer.speed);
}

/* -------------------------------------------------------------------------- */

async function solver(input: string): Promise<number> {
	const reindeer = parseInput(input);

	const longestDistance = reindeer.reduce(
		(longestDistance, reindeer) => Math.max(longestDistance, calculateDistance(reindeer, 2503)), 0);

	return longestDistance;
}

/* ========================================================================== */

export default {
	prompt: 'The distance traveled by the winning reindeer is',
	solver
} satisfies Solution;
