import { isValid } from './helpers/is-valid.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): number {
	const { rules, updates } = parseInput(input);

	return updates.reduce<number>((total, update) =>
		isValid(update, rules) ? total + update[Math.floor(update.length / 2)] : total, 0
	);
}

/* ========================================================================== */

export default {
	prompt: 'The sum of the middle page numbers of the valid updates is',
	solver
} satisfies Solution;
