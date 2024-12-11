export function testRepeatingLetter(word: string): boolean {
	for (let index = 0; index < word.length - 2; index++) {
		const isRepeated = word.charAt(index) === word.charAt(index + 2);

		if (isRepeated) return true;
	}

	return false;
}

export function testRepeatingGroup(word: string): boolean {
	for (let index = 0; index < word.length - 3; index++) {
		const group = word.substring(index, index + 2);
		const isRepeated = word.indexOf(group, index + 2) !== -1;

		if (isRepeated) return true;
	}

	return false;
}

function isWordNice(word: string): boolean {
	return testRepeatingGroup(word) && testRepeatingLetter(word);
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
