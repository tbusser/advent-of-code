type LetterOccurrences = Record<string, number>;

/* ========================================================================== */

const checksumLength = 5;

/* ========================================================================== */

function sortLetters(occurrences: LetterOccurrences): string[] {
	return Object.keys(occurrences).sort((letter, otherLetter) => {
		// The difference should be calculate so the letters with the most
		// occurrences is in the front of the array.
		const difference = occurrences[otherLetter] - occurrences[letter];

		// When there is no tie, return the difference to indicate the
		// sort order.
		if (difference !== 0) return difference;

		// When both letters occur the same number of times, use the
		// alphabetical order to determine which letter comes first.
		return letter < otherLetter ? -1 : 1;
	});
}

/* ========================================================================== */

export function generateChecksum(encryptedName: string): string {
	// Remove all the hyphens
	const name = encryptedName.replace(/-/g, '');
	const occurrences: LetterOccurrences = {};

	// Count per letter how many times it appears in the encrypted name.
	for (const letter of name) {
		occurrences[letter] = (occurrences[letter] ?? 0) + 1;
	}

	const sortedLetters = sortLetters(occurrences);

	// Take as many letters as the checksum is long and return that as a single
	// value as the result.
	return sortedLetters.slice(0, checksumLength).join('');
}
