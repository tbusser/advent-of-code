export function parseInput(input: string): number[][] {
	return input.split(',').map(item => item.split('-').map(Number));
}
