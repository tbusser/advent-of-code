import { countStonesAfterBlinking } from './helpers/count-stones.js';

/* ========================================================================== */

function solver(input: string): number {
	const stones = input.split(' ').map(Number);

	return countStonesAfterBlinking(stones, 25);
}

/* ========================================================================== */

export default {
	prompt: 'Number of stones after blinking 25 times',
	solver
} satisfies Solution;
