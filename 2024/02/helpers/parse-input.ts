export type Report = number[];

/* ========================================================================== */

export function parseInput(input: string): Report[] {
	const lines = input.split('\n');

	return lines.map(line => line.split(' ').map(Number));
}
