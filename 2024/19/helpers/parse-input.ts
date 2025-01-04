export function parseInput(input: string): { patterns: string[], designs: string[] } {
	const [patterns, designs] = input.split('\n\n');

	return {
		patterns: patterns.split(', '),
		designs: designs.split('\n')
	};
}
