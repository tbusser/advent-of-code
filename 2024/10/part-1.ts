import { TopographicMap } from './helpers/topographic-map.js';

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	const topographicMap = TopographicMap.createInstance(input);
	const trailEnds: Record<number, Set<number>> = {};

	topographicMap.findTrails((start: number, end: number) => {
		trailEnds[start] ??= new Set();
		trailEnds[start].add(end);
	});

	return Object.values(trailEnds).reduce<number>((total, endings) => total + endings.size, 0);
}

/* ========================================================================== */

export default {
	prompt: 'The sum of the score of all the trailheads is',
	solver
} satisfies Solution;
