export function parseInput(input: string): string[] {
	return input.split('\n').map(line => `${line}`);
}
