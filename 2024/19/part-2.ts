import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

const cache = new Map<string, number>();

/* ========================================================================== */

function countWaysToMakeDesign(design: string, patterns: string[]): number {
	function countWays(currentDesign: string): number {
		if (cache.has(currentDesign)) return cache.get(currentDesign);

		let total: number = 0;

		for (const pattern of patterns) {
			if (currentDesign === pattern) {
				// Patterns themselves will not be stored in the cache. We just
				// have to increment the counter by one.
				total++;
			} else if (currentDesign.startsWith(pattern)) {
				// Add the number of ways the design after the current pattern
				// can be created.
				total += countWays(currentDesign.substring(pattern.length));
			}
		}

		// Place the current design in the cache with the number of ways it can
		// be created.
		cache.set(currentDesign, total);

		return total;
	}

	// The assumption is made that all designs are unique.
	return countWays(design);
}

/* -------------------------------------------------------------------------- */

function solver(input: string): number {
	const data = parseInput(input);
	let count = 0;

	data.designs.forEach(design => {
		count += countWaysToMakeDesign(design, data.patterns);
	});

	return count;
}

/* ========================================================================== */

export default {
	prompt: 'The sum of different ways for each design',
	solver
} satisfies Solution;
