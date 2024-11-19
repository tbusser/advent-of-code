import { isPasswordValid } from './validation.js';
import {
	charCodeA,
	charCodeI,
	charCodeL,
	charCodeO,
	charCodeZ
} from './shared.js';

/* ========================================================================== */

function getNextCharCode(charCode: number): number {
	charCode++;

	// When the next char code is for one of the restricted letters, skip and
	// continue to the next letter.
	return (charCode === charCodeI || charCode === charCodeL || charCode === charCodeO)
		? charCode++
		: charCode;
}

/* ========================================================================== */

/**
 * Converts a password to an array of character codes.
 */
export function convertPasswordToNumberArray(password: string): number[] {
	const result: number[] = [];

	for (let index = 0; index < password.length; index++) {
		result.push(password.charCodeAt(index));
	}

	return result;
}

export function convertNumberArrayToPassword(password: number[]): string {
	return String.fromCharCode(...password);
}

export function* generateNextPossiblePassword(start: number[]): Generator<number[], number[]> {
	// Create a copy so the original password doesn't get modified.
	const password = [...start];

	while (true) {
		let position = password.length - 1;
		// Starting from the back, reset the character to 'a' if it is now a
		// 'z'. Stop when the letter for the current iteration is not a 'z' or
		// we've progressed past the beginning of the string.
		while (password[position] === charCodeZ && position >= 0) {
			password[position] = charCodeA;
			position--;
		}

		// When all the characters are the letter 'z', there is no
		// next possible password. Return the original password.
		if (position === -1) {
			return start;
		}

		// Get the next iteration of the password and return it.
		password[position] = getNextCharCode(password[position]);

		yield password;
	}
}

export function findNextPassword(start: string): string | null {
	const password = convertPasswordToNumberArray(start);
	const candidates = generateNextPossiblePassword(password);

	// Iterate over the candidates.
	for (const candidate of candidates) {
		// Evaluate if the current password is valid. When the password is
		// valid return it.
		if (isPasswordValid(candidate)) return convertNumberArrayToPassword(candidate);
	}

	// No new valid password found, return null.
	return null;
}
