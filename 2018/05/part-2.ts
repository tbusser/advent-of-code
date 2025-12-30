import { parseInput } from './helpers/parse-input.js';
import { react } from './helpers/react.optimal.js';

/* ========================================================================== */

function solver(input: string): number {
	const data = parseInput(input);
	let minLength: number = Infinity;

	for (let charIndex: number = 65; charIndex < 91; charIndex++) {
		const polymer = data.filter(item => item !== charIndex && item !== charIndex + 32);
		minLength = Math.min(minLength, react(polymer));
	}

	return minLength;
}

/* ========================================================================== */

export default {
	prompt: 'Remaining units',
	solver
} satisfies Solution;
