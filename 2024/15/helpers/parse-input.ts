export function parseInput(input: string): { grid: string[], moves: string } {
	const [grid, lines] = input.split('\n\n');
	const moves = lines.split('\n').reduce((result, line) => result + line, '');

	return {
		grid: grid.split('\n'),
		moves
	};
}
