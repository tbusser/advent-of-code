export type Range = [start: number, end: number];

export type Input = {
	ranges: Range[];
	ingredients: number[];
};

/* ========================================================================== */

export function parseInput(input: string): Input {
	const [rangesInput, ingredientsInput] = input.split('\n\n');

	return {
		ranges: rangesInput.split('\n').map(range =>
			range.split('-').map(Number) as Range
		).sort(
			// Sort the ranges ascending by their start id.
			(a, b) => a[0] - b[0]
		),
		ingredients: ingredientsInput.split('\n').map(Number)
	};
}
