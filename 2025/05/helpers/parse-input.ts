export type Range = {
	start: number, end: number
};

export type Input = {
	ranges: Range[];
	ingredients: number[];
};

/* ========================================================================== */

export function parseInput(input: string): Input {
	const [rangesInput, ingredientsInput] = input.split('\n\n');

	return {
		ranges: rangesInput.split('\n').map(range => {
			const limits = range.split('-').map(Number);

			return { start: limits[0], end: limits[1] };
		}).sort(
			// Sort the ranges ascending by their start id.
			(a, b) => a.start - b.start
		),
		ingredients: ingredientsInput.split('\n').map(Number)
	};
}
