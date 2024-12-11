const doubleLetterRegex = /([a-z])\1/;
const forbiddenCombosRegex = /ab|cd|pq|xy/;
const vowelRegex = /[aeiou]/g;

/* ========================================================================== */

export function testDoubleLetter(word: string): boolean {
	return doubleLetterRegex.test(word);
}

export function testNoForbiddenCombos(word: string): boolean {
	return !forbiddenCombosRegex.test(word);
}

export function testVowelCondition(word: string): boolean {
	return (word.match(vowelRegex)?.length ?? 0) >= 3;
}

export function isWordNice(word: string): boolean {
	return (
		testVowelCondition(word) &&
		testDoubleLetter(word) &&
		testNoForbiddenCombos(word)
	);
}

/* ========================================================================== */

function solver(input: string): number {
	const words = input.split('\n');
	let numberOfNiceWords = 0;

	words.forEach(word => {
		if (isWordNice(word)) {
			numberOfNiceWords++;
		}
	});

	return numberOfNiceWords;
}

/* ========================================================================== */

export default {
	prompt: 'Number of nice words',
	solver
} satisfies Solution;
