/**
 * Returns an array with the weight per package to be fitted on the sleigh. The
 * array is sorted in descending order, the heaviest packages first. Returning
 * the package in this order roughly reduces the time to find a solution by a
 * factor of 4 compared to starting with the lightest packages.
 *
 * @param input The puzzle input.
 *
 * @returns The weight for each package in descending order.
 */
export function parseInput(input: string): number[] {
	return input
		.split('\n')
		.map(Number)
		.reverse();
}
