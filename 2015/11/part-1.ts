import { findNextPassword } from './helpers/password.js';

const puzzleInput: string = 'hepxcrrq';

/* ========================================================================== */

export async function solver(): Promise<string> {
	const nextValidPassword = findNextPassword(puzzleInput);

	return nextValidPassword;
}

export const prompt = `The next valid password after "${puzzleInput}" is`;
