export type Container = {
	id: number,
	volume: number;
};

/* ========================================================================== */

export function parseInput(input: string): Container[] {
	const lines = input.split('\n');

	return lines.map((value, index) => ({ id: index, volume: Number(value) }));
}
