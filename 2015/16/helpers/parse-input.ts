import { Profile } from './profile.js';

/* ========================================================================== */

const nameRegex = /Sue \d+: /;
const propertyRegex = /([a-z]+)/g;

/* ========================================================================== */

export function parseInput(input: string): Profile[] {
	const lines = input.split('\n');

	return lines.map(line => {
		const preparedLine = line
			// Remove the start of the line with the number of the Sue.
			.replace(nameRegex, '')
			// Wrap all strings in double quotes.
			.replace(propertyRegex, '"$1"');

		// By wrapping the prepared line in { } we a string which can be parsed
		// by JSON resulting in an object.
		return JSON.parse(`{ ${preparedLine} }`);
	});
}
