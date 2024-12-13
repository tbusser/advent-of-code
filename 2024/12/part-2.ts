import { Garden } from './helpers/garden.js';

/* ========================================================================== */

function solver(input: string): number {
	const garden = Garden.createInstance(input);

	return garden.calculateFencingPriceBySides();
}

/* ========================================================================== */

export default {
	prompt: 'The total price of fencing all regions on the map is',
	solver
} satisfies Solution;
