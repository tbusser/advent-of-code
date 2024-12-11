import { parseInput } from './helpers/parse-input.js';

import { findCode } from './helpers/find-code.js';
import { keyFive } from './helpers/keypad-two.js';

/* ========================================================================== */

function solver(input: string): string {
	const instructionsPerDigit = parseInput(input);

	return findCode(instructionsPerDigit, keyFive);
}

/* ========================================================================== */

export default {
	prompt: 'The bathroom code is',
	solver
} satisfies Solution<string>;
