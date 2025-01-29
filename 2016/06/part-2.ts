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
		const occurrenceMap = new Array(26).fill(0);

		words.forEach(word => occurrenceMap[word[column] - 97]++);

		const charCode = occurrenceMap.reduce<CharOccurrence>((best, count, charCode) => {
			return count < best.count && count !== 0 ? { count, charCode } : best;
		}, { count: Infinity, charCode: 0 }).charCode + 97;

		message.push(String.fromCharCode(charCode));
	}

	return message.join('');
}

/* ========================================================================== */

export default {
	prompt: 'The original message sent by Santa is',
	solver
} satisfies Solution<string>;
