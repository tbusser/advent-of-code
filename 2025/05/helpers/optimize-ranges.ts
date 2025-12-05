import { type Range } from './parse-input.js';

/* ========================================================================== */

const start: number = 0;
const end: number = 1;

/* ========================================================================== */

/**
 * Merges ranges which are subsets or extend each other.
 *
 * @param ranges The ranges to optimize, sorted by the range start in an
 *        ascending order.
 */
export function optimizeRanges(ranges: Range[]): Range[] {
	// Seed the result with the very first range.
	const optimized: Range[] = [ranges[0]];

	// Iterate over the ranges starting from the second range, the first range
	// is the seed for the results.
	for (let index = 1; index < ranges.length; index++) {
		// Check if the start of the current range is equal to, or less than,
		// the end of the last optimized range. The reason to subtract one from
		// the range start is to be able to stitch ranges together which
		// extend each other.
		// E.g.: When the last optimized range is [5, 10] and the current range
		//       is [11, 20], the current range extends the last optimized range
		//       resulting in an optimized range of [5, 20].
		if (ranges[index][start] - 1 <= optimized.at(-1)[end]) {
			// The current range starts at or before the end of the last
			// optimized range. We need to check if the current range ends
			// before the last optimized range ends. Only when the end of the
			// current range is larger do we need to update the last
			// optimized range.
			if (optimized.at(-1)[end] < ranges[index][end]) optimized.at(-1)[end] = ranges[index][end];
		} else {
			// The current range starts after the end of the last optimized
			// range. For now the current range is an optimized range.
			optimized.push(ranges[index]);
		}
	}

	return optimized;
}
