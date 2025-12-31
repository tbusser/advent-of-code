/**
 * Builds the prefix table (failure function) for KMP sequence matching.
 * For each position i in the pattern, prefixTable[i] stores the length of
 * the longest proper prefix which is also a suffix for pattern[0..i].
 *
 * This table allows the rolling-match to "jump back" efficiently on mismatches.
 */
function buildPrefixTable(sequence: number[]): number[] {
	const prefixTable = Array(sequence.length).fill(0); // Initialize table with 0s
	let currentMatchLength = 0; // Length of the current matching prefix

	for (let patternIndex = 1; patternIndex < sequence.length; patternIndex++) {
		// If there is a mismatch, fall back to the previous longest prefix
		while (currentMatchLength > 0 && sequence[patternIndex] !== sequence[currentMatchLength]) {
			currentMatchLength = prefixTable[currentMatchLength - 1];
		}

		// If current elements match, extend the current prefix length
		if (sequence[patternIndex] === sequence[currentMatchLength]) {
			currentMatchLength++;
		}

		// Store the length of the longest proper prefix which is also suffix
		prefixTable[patternIndex] = currentMatchLength;
	}

	return prefixTable;
}

function growArray(array: Uint8Array, newSize: number): Uint8Array {
	const newArray: Uint8Array = new Uint8Array(newSize);
	newArray.set(array);

	return newArray;
}

/* ========================================================================== */

function solver(input: string): number {
	const sequence: number[] = input.split('').map(Number);
	const prefixTable = buildPrefixTable(sequence);
	let recipes: Uint8Array = new Uint8Array(1_000_000);

	// Seed the recipes array with the initial scores
	recipes[0] = 3;
	recipes[1] = 7;

	let size = 2;
	let elfOneIndex = 0;
	let elfTwoIndex = 1;
	let matchIndex = 0;

	while (true) {
		const sum: number = recipes[elfOneIndex] + recipes[elfTwoIndex];

		if (sum > 9) {
			if (size === recipes.length) recipes = growArray(recipes, size + size);

			recipes[size++] = 1;

			// KMP-style rolling match
			while (matchIndex > 0 && 1 !== sequence[matchIndex]) {
				matchIndex = prefixTable[matchIndex - 1];
			}
			if (1 === sequence[matchIndex]) matchIndex++;
			if (matchIndex === sequence.length) return size - sequence.length;
		}

		const digit = sum % 10;
		if (size === recipes.length) recipes = growArray(recipes, size + size);

		recipes[size++] = digit;

		// KMP-style rolling match
		while (matchIndex > 0 && digit !== sequence[matchIndex]) {
			matchIndex = prefixTable[matchIndex - 1];
		}
		if (digit === sequence[matchIndex]) matchIndex++;
		if (matchIndex === sequence.length) return size - sequence.length;

		elfOneIndex = (elfOneIndex + 1 + recipes[elfOneIndex]) % size;
		elfTwoIndex = (elfTwoIndex + 1 + recipes[elfTwoIndex]) % size;
	}
}

/* ========================================================================== */

export default {
	prompt: 'Recipes in front of input sequence',
	solver
} satisfies Solution;
