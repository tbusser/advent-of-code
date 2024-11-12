import {
	charCodeI,
	charCodeL,
	charCodeO
} from './shared.js';

/* ========================================================================== */

const invalidCharCodes = new Set([charCodeI, charCodeL, charCodeO]);

/* ========================================================================== */

export function meetsDoubleLetterRequirement(password: number[]): boolean {
	let pairCount = 0;
	let index = 0;

	// Iterate over the characters in the password.
	while (index < password.length - 1) {
		// Check if the next character matches the current letter.
		if (password[index] !== password[index + 1]) {
			index++;
		} else {
			// Increase the number of found pairs.
			pairCount++;
			// When the pair count reaches two, the requirement has been met.
			// There is no need to keep evaluating the rest of the password.
			if (pairCount === 2) return true;

			// We haven't yet found two pairs. Skip the next letter, it can not
			// be part of another pair.
			index = index + 2;
		}
	}

	return false;
}

export function meetsInvalidCharacterRestriction(password: number[]): boolean {
	const passWordSet = new Set(password);

	return invalidCharCodes.intersection(passWordSet).size === 0;
}

export function meetsSequentialCharactersRequirement(password: number[]): boolean {
	for (let index = 0; index < password.length - 2; index++) {
		const currentCharCode = password[index];

		if (
			password[index + 1] - currentCharCode === 1 &&
			password[index + 2] - currentCharCode === 2
		) {
			return true;
		}
	}

	return false;
}

export function isPasswordValid(password: number[]): boolean {
	return (
		meetsInvalidCharacterRestriction(password) &&
		meetsDoubleLetterRequirement(password) &&
		meetsSequentialCharactersRequirement(password)
	);
}
