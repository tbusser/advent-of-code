import { countHouses } from './helpers/count-houses.js';

/* ========================================================================== */

export async function solver(input: string): Promise<number> {
	return countHouses(input, 1);
}

export const prompt = 'How many houses receive at least 1 present';
