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
		).sort((a, b) =>
			// When the range start is equal, sort the ranges based on the
			// end of the range
			a[0] - b[0] === 0 ? a[1] - b[1] : a[0] - b[0]
		),
		ingredients: ingredientsInput.split('\n').map(Number)
	};
}
