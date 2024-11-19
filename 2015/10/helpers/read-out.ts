const regex = /(\d)\1*/g;

/* ========================================================================== */

export function readOut(input: string): string {
	const matches = input.match(regex);

	return matches.reduce((result, match) => `${result}${match.length}${match.charAt(0)}`, '');
}

export function readOutNumberOfTimes(input: string, iterations: number): string {
	let iteration = input;

	for (let index = 0; index < iterations; index++) {
		iteration = readOut(iteration);
	}

	return iteration;
}
