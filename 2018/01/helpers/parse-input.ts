export type Input = number[];

/* ========================================================================== */

export function parseInput(input: string): Input {
	return input.split('\n').map(Number);
}
