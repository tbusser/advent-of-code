import { countHouses } from './helpers/count-houses.js';

/* ========================================================================== */

function solver(input: string): number {
	return countHouses(input, 2);
}

/* -------------------------------------------------------------------------- */

export default {
	prompt: 'How many houses receive at least 1 present',
	solver
} satisfies Solution;
