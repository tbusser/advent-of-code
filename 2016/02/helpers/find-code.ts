import { Key } from './types.js';

/* ========================================================================== */

function followInstructions(start: Key, instructions: string): Key {
	let key = start;

	for (const instruction of instructions) {
		key = key.neighbors[instruction] ?? key;
	}

	return key;
}

/* -------------------------------------------------------------------------- */

export function findCode(instructionsPerDigit: string[], start: Key): string {
	const result: string[] = [];

	for (const instructions of instructionsPerDigit) {
		start = followInstructions(start, instructions);
		result.push(start.value);
	}

	return result.join('');
}
