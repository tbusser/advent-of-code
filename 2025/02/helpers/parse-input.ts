export type Input = number[][];

/* ========================================================================== */

export function parseInput(input: string): Input {
	return input.split(',').map(item => item.split('-').map(Number));
}
