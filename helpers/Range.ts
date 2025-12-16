/**
 * Represents a numeric range with inclusive start and end boundaries. Only
 * ascending ranges (start ≤ end) are supported.
 */
export class Range {
	/**
	 * @param start - The start number of the range, inclusive.
	 * @param end - The end number of the range, inclusive.
	 */
	constructor(public readonly start: number, public readonly end: number) {
		if (start > end) {
			throw new Error(`Invalid range, start (${start}) should be less than or equal to end (${end})`);
		}
	}

	/* ---------------------------------------------------------------------- */

	static fromString(input: string): Range {
		const match = input.trim().match(/(-?\d+)\D+?(-?\d+)/);
		if (match === null) {
			throw new Error(`Unable to create range from "${input}"`);
		}
		const [, start, end] = match.map(Number);

		return new Range(start, end);
	}

	static mergeOverlapping(ranges: Range[]): Range[] {
		if (ranges.length <= 1) return ranges;

		// Sort by range start in ascending order. When the start of two range
		// are the same, sort them by range end in descending order (larger
		// ranges come first).
		// Sorting them like this will be make it possible to easily dismiss
		// shorter ranges as the bigger will already be created earlier.
		const sortedRanges = ranges.toSorted((a, b) => a.start - b.start || b.end - a.end);

		const mergedRanges: Range[] = [];
		let currentRange: Range = sortedRanges.shift();

		for (const nextRange of sortedRanges) {
			if (currentRange.end >= nextRange.end) {
				// Do nothing, the next range ends before the current range.
				continue;
			} else if (currentRange.end >= nextRange.start - 1) {
				// The next range either starts before the end of the current
				// range or it is just one number after.
				// E.g.: If current.end is 10 and the next range starts at 11
				//.      we will merge them when we subtract one from the start.
				currentRange = new Range(currentRange.start, nextRange.end);
			} else {
				// There is no overlap, the current range won't be extend and
				// can be pushed. The next range will be the new current.
				mergedRanges.push(currentRange);
				currentRange = nextRange;
			}
		}

		// Add the last range.
		mergedRanges.push(currentRange);

		return mergedRanges;
	}

	/* ---------------------------------------------------------------------- */

	get size(): number {
		// Add one because the range is inclusive.
		return this.end - this.start + 1;
	}

	/* ---------------------------------------------------------------------- */

	/**
	 * Checks if the provided value is within the start and end, inclusive, of
	 * the range.
	 *
	 * @param value - The value to check if it is in range.
	 * @returns true if the value is in range; otherwise false.
	 */
	contains(value: number): boolean {
		return this.start <= value && this.end >= value;
	}
}
