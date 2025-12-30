export type Input = number[];

/* ========================================================================== */

export function parseInput(input: string): Input {
	return input.split('').map(char => char.charCodeAt(0));
}
