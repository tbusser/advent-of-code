import { calculateTokensToSpend } from './helpers/calculate-tokens.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): number {
	const machines = parseInput(input, 10000000000000);

	return machines.reduce<number>((total, machine) => total + calculateTokensToSpend(machine), 0);
}

/* ========================================================================== */

export default {
	prompt: 'Fewest tokens you can spend to win all prices',
	solver
} satisfies Solution;
