const letterA = 'a'.charCodeAt(0);

/* ========================================================================== */

export function decryptName(encryptedName: string, sectorId: number): string {
	const letters: string[] = [];

	for (const letter of encryptedName) {
		if (letter === '-') {
			letters.push(' ');

			continue;
		} else {
			// It is a lot going on in one line, the following is happening:
			// 1) `letter.charCodeAt(0)`: get the ANSI code for the letter.
			// 2) `+ sectorID`: we have to shift the letter as many times as
			//    as the sector ID, adding the sector ID accomplishes this.
			// 3) `- letterA`: before doing the modulo we need to number we have
			//    to be zero based, we do this by subtracting the ANSI code for
			//    the letter a.
			// 4) `% 26`: we now have the number after adding 1 as many times as
			//    the sector ID and we have corrected this number so the number
			//    for a would be 0. Applying a module of 26 means the number
			//    will always be between 0 (=a) and 25 (=z)
			// 5) `+ letterA`: we have to undo the subtracting of the ANSI value
			//    for a. Once we add this back we have a number which correctly
			//    identifies a lower case letter in the ANSI table.
			// 6) `fromCharCode`: this will convert the number to its
			//     corresponding letter.
			letters.push(String.fromCharCode((((letter.charCodeAt(0) + sectorId) - letterA) % 26) + letterA));
		}
	}

	return letters.join('');
}
