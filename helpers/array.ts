export function chunk<T>(input: T[], size: number): T[][] {
	const output: T[][] = [];

	for (let index = 0; index < input.length; index += size) {
		output.push(input.slice(index, index + size));
	}

	return output;
}
