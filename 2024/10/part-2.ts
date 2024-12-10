import { TopographicMap } from './helpers/topographic-map.js';

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	const topographicMap = TopographicMap.createInstance(input);
	const trailsFromStart: Record<number, number> = {};

	topographicMap.findTrails((start: number) => {
		trailsFromStart[start] = (trailsFromStart[start] ?? 0) + 1;
	});

	return Object.values(trailsFromStart).reduce((total, count) => total + count, 0);
}

/* ========================================================================== */

export default {
	prompt: 'The sum of all ratings of all trailheads is',
	solver
} satisfies Solution;
