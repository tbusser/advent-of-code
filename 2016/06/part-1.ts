import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

type CharOccurrence = {
	charCode: number
	count: number;
};

/* ========================================================================== */

function solver(input: string): string {
	const words = parseInput(input);
	const columns = words[0].length;
	const message: string[] = [];

	for (let column = 0; column < columns; column++) {
		// Since the words only contain the letter a to z we need an array which
		// can hold 26 items. Initialize each item with a count of 0.
		const occurrenceMap = new Array(26).fill(0);

		// Iterate over all the words and get the char code for the current
		// column. Now subtract 97 so a becomes index 0, b becomes index 1, etc.
		words.forEach(word => occurrenceMap[word[column] - 97]++);

		// Find the letter which was seen the most in the current column. Add
		// 97 again so the index become a char code in the range of a to z.
		const charCode = occurrenceMap.reduce<CharOccurrence>((mostEncountered, count, charCode) => {
			return count > mostEncountered.count ? { count, charCode } : mostEncountered;
		}, { count: 0, charCode: 0 }).charCode + 97;

		// Convert the char code to a letter and push it in the result array.
		message.push(String.fromCharCode(charCode));
	}

	return message.join('');
}

/* ========================================================================== */

export default {
	prompt: 'The error-corrected version of the message is',
	solver
} satisfies Solution<string>;
