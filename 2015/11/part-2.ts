import { findNextPassword } from './helpers/password.js';

const puzzleInput: string = 'hepxxyzz';

/* ========================================================================== */

function solver(): string {
	const nextValidPassword = findNextPassword(puzzleInput);

	return nextValidPassword;
}

/* ========================================================================== */

export default {
	prompt: `The next valid password after "${puzzleInput}" is`,
	solver
} satisfies Solution<string>;
