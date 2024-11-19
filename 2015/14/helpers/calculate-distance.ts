import { Reindeer } from './parse-input.js';

export function calculateDistance(reindeer: Reindeer, duration: number): number {
	const completedCycles = Math.floor((duration) / reindeer.cycleTime);
	const leftOverCycle = duration % reindeer.cycleTime;
	const leftOverFlightTime = Math.min(reindeer.flightTime, leftOverCycle);

	return (completedCycles * reindeer.cycleDistance) + (leftOverFlightTime * reindeer.speed);
}
