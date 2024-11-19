import { countHouses } from './helpers/count-houses.js';

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	return countHouses(input, 2);
}

/* -------------------------------------------------------------------------- */

export default {
	prompt: 'How many houses receive at least 1 present',
	solver
} satisfies Solution;
