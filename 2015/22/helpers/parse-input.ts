import { BossStats } from './types.js';

/* ========================================================================== */

export function parseInput(input: string): BossStats {
	const [hitPoints, damage] = input.split('\n').map(line => Number(line.replace(/\D/g, '').trim()));

	return {
		damage,
		hitPoints
	} satisfies BossStats;
}
