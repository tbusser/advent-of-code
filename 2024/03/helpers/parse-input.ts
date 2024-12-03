// Matches anything that fits the pattern mul(<number>,<number>)
const instructionsRegex = /mul\(\d+,\d+\)/g;
// Matches anything that fits the pattern mul(<number>,<number>) or "don't()"
// or "do()".
const conditionalsRegex = /mul\(\d+,\d+\)|don't\(\)|do\(\)/g;
// Matches any number.
const numbersRegex = /\d+/g;

const disableInstruction = 'don\'t()';
const enableInstruction = 'do()';

/* ========================================================================== */

/**
 * Parses the input and returns something the solver can use directly.
 *
 * @returns An array where each item contains and array of two numbers. These
 *          are the numbers that have to multiplied together.
 */
export function parseInput(input: string): number[][] {
	// Find all the mul(<number>,<number>) statements in the input.
	const instructions = input.match(instructionsRegex);

	// For each instructions, find the numbers and convert them from a string to
	// an actual number.
	return instructions.map(instruction => instruction.match(numbersRegex).map(Number));
}

/**
 * Parses the input and returns something the solver can use directly.
 *
 * @returns An array where each item contains and array of two numbers. These
 *          are the numbers that have to multiplied together.
 */
export function parseInputWithConditionals(input: string): number[][] {
	// Use the regex which also captures the "don't()" and "do()" statements.
	const instructions = input.match(conditionalsRegex);

	// Keep track of the disabled state.
	let isEnabled: boolean = true;
	// This array will hold the number pairs per mul instruction.
	const numberPairs: number[][] = [];

	for (const instruction of instructions) {
		if (instruction === disableInstruction) {
			isEnabled = false;
		} else if (instruction === enableInstruction) {
			isEnabled = true;
		} else if (isEnabled) {
			// Only add number pairs as long as we're enabled. Any number pairs
			// we encounter while disabled can be ignored.
			numberPairs.push(instruction.match(numbersRegex).map(Number));
		}
	}

	return numberPairs;
}
