import { parseInput } from './helpers/parse-input.js';

import { findCode } from './helpers/find-code.js';
import { keyFive } from './helpers/keypad-one.js';

/* ========================================================================== */

async function solver(input: string): Promise<string> {
	const instructionsPerDigit = parseInput(input);

	return findCode(instructionsPerDigit, keyFive);
}

/* ========================================================================== */

export default {
	prompt: 'The bathroom code is',
	solver
} satisfies Solution<string>;
