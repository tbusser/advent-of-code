import { countStonesAfterBlinking } from './helpers/count-stones.js';

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	const stones = input.split(' ').map(Number);

	return countStonesAfterBlinking(stones, 75);
}

/* ========================================================================== */

export default {
	prompt: 'Number of stones after blinking 75 times',
	solver
} satisfies Solution;
