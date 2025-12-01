export function parseInput(input: string): number[] {
	return input
		// Replace the R with nothing, these will be become positive numbers.
		.replaceAll('R', '')
		// Replace the L with a minus, these will become negative numbers.
		.replaceAll('L', '-')
		// Now split the input on line endings so we get an array where each
		// line is now an item.
		.split('\n')
		// Convert the items to numbers.
		.map(Number);
}
