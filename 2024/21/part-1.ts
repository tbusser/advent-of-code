import { parseInput } from './helpers/parse-input.js';
import { UniversalKeypad } from './helpers/universal-keypad.js';

/* ========================================================================== */

const keypad = new UniversalKeypad();

/* ========================================================================== */

function calculateComplexity(code: string): number {
	return keypad.generateInstructions(code, 3) * parseInt(code, 10);
}

function solver(input: string): number {
	const data = parseInput(input);

	return data.reduce<number>((total, code) => total + calculateComplexity(code), 0);
}

/* ========================================================================== */

export default {
	prompt: 'The sum of the complexities of the codes in the list is',
	solver
} satisfies Solution;
