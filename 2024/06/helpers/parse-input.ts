export function parseInput(input: string): string[] {
	const lines = input.split('\n');
	const lineLength = lines[0].length;
	const filler = Array(lineLength + 2).fill('E').join('');

	// Pad the grid with cells filled with 'E', this will make it easier to
	// detect when the guard leaves the room.
	return [
		filler,
		...lines.map(line => `E${line}E`),
		filler
	];
}
