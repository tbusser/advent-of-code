// Regex to match backslashes or quotes, these are the characters we need
// to encode.
const regex = /\\|"/g;

/* ========================================================================== */

function parseInput(input: string) {
	const lines = input.split('\n');

	let encodingLength: number = 0;

	lines.forEach(line => {
		// Look for all the characters we need to escape in the line.
		const charactersToEncode = line.matchAll(regex).toArray().length;

		// Increase counter of extra space needed by the number of characters to
		// escape (these all get prefixed with an "\"), and add 2 more
		// characters for the begin and end quote.
		encodingLength += charactersToEncode + 2;
	});

	// Return the characters needed for the characters to be added for encoding
	// all the lines.
	return encodingLength;
}

/* -------------------------------------------------------------------------- */

function solver(input: string): number {
	return parseInput(input);
}

/* ========================================================================== */

export default {
	prompt: 'Number of characters needed for the encoding',
	solver
} satisfies Solution;
