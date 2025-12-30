import { type Input, parseInput } from './helpers/parse-input.js';
import { react } from './helpers/react.mine.js';

/* ========================================================================== */

function solver(input: string): number {
	const data: Input = parseInput(input);

	return react(data);
}

/* ========================================================================== */

export default {
	prompt: 'Remaining units',
	solver
} satisfies Solution;
