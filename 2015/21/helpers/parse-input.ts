import { Stats } from './types.js';

export function parseInput(input: string): Stats {
	const [hitPoints, damage, armor] = input.split('\n').map(line => Number(line.replace(/\D/g, '').trim()));

	return {
		hitPoints,
		damage,
		armor
	} satisfies Stats;
}
