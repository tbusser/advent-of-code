type LocationLists = number[][];

/* ========================================================================== */

/**
 * Returns lists of location IDs, sorted in descending order.
 */
export function parseInput(input: string): LocationLists {
	const lines = input.split('\n');

	const left: number[] = [];
	const right: number[] = [];

	for (const line of lines) {
		const [leftValue, rightValue] = line.split('   ');

		left.push(Number(leftValue));
		right.push(Number(rightValue));
	}

	return [
		left.sort(),
		right.sort()
	];
}
